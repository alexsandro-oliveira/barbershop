import type { Barbershop } from "@prisma/client"
import { useState, type Dispatch, type SetStateAction } from "react"
import { createRating } from "../_actions/create-rating"
import { toast } from "sonner"
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import StarRating from "./star-rating"
import { Button } from "./ui/button"

interface RatingStarProps {
  barbershop: Pick<Barbershop, "name" | "id">
  setIsSheetOpen: Dispatch<SetStateAction<boolean>>
}

const RatingStarDialog = ({ barbershop, setIsSheetOpen }: RatingStarProps) => {
  const [rating, setRating] = useState(0)

  const handleCreateRating = async () => {
    try {
      if (rating == 0) {
        return
      }
      await createRating({ barbershopId: barbershop.id, rating: rating })

      setIsSheetOpen(false)
      toast.success("Avaliação enviada com sucesso!")
    } catch (error) {
      console.error(error)
      toast.error("Erro ao enviar avaliação. Tente novamente")
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Avalie sua experiência</DialogTitle>
        <DialogDescription>
          {`Toque nas estrelas para avaliar sua experiência na ${barbershop.name}`}
        </DialogDescription>
      </DialogHeader>
      <div className="flex justify-center">
        <StarRating setRating={setRating} />
      </div>
      <DialogFooter className="mt-6 flex flex-row gap-3">
        <DialogClose asChild>
          <Button variant="secondary" className="w-full">
            Cancelar
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button
            variant="default"
            className="w-full"
            onClick={handleCreateRating}
          >
            Confirmar
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  )
}

export default RatingStarDialog
