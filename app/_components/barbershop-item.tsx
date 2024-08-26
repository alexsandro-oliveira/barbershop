import type { Barbershop } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { StarIcon } from "lucide-react"
import Link from "next/link"
import { getRatingBarbershop } from "../_data/get-rating-barbershop"

interface BarbershopItemProps {
  barbershop: Barbershop
}

const BarbershopItens = async ({ barbershop }: BarbershopItemProps) => {
  const rating = await getRatingBarbershop(barbershop)

  return (
    <Card className="min-w-[167px] rounded-2xl">
      <CardContent className="p-1 py-1">
        {/* IMAGEM */}
        <div className="relative h-[159px] w-full">
          <Image
            alt={barbershop.name}
            fill
            className="rounded-2xl object-cover"
            src={barbershop.imageUrl}
          />

          <Badge
            className="absolute left-2 top-2 space-x-1 opacity-85"
            variant="secondary"
          >
            {/* TODO: puxar avalidação do db */}
            <StarIcon size={12} className="fill-primary text-primary" />
            <p className="text-xs font-semibold">{rating.rating}</p>
          </Badge>
        </div>

        {/* TEXTO */}
        <div className="px-1 py-3">
          <h2 className="truncate font-semibold">{barbershop.name}</h2>
          <p className="truncate text-xs text-gray-400">{barbershop.address}</p>
          <Button variant="secondary" className="mt-3 w-full" asChild>
            <Link href={`/barbershops/${barbershop.id}`}>Reservar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default BarbershopItens
