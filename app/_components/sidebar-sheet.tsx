"use client"

import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { quickSearchOptions } from "../_constants/quickSearch"
import Link from "next/link"
import { Button } from "./ui/button"
import Image from "next/image"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { signOut, useSession } from "next-auth/react"
import { Avatar, AvatarImage } from "./ui/avatar"
import SignInDialog from "./signIn-dialog"

const SidebarSheet = () => {
  const { data } = useSession()

  const handleLogountClick = () => signOut()

  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="flex items-center justify-between gap-3 border-b border-solid py-5">
        {data?.user ? (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={data?.user?.image ?? ""} />
            </Avatar>

            <div>
              <p className="font-bold">{data.user.name}</p>
              <div className="text-xs">{data.user.email}</div>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-bold">Olá. Faça seu login!</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon">
                  <LogInIcon />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%] rounded-2xl">
                <SignInDialog />
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>

      <div className="flex flex-col gap-2 border-b border-solid py-5">
        <SheetClose asChild>
          <Button variant="ghost" className="justify-start gap-2" asChild>
            <Link href="/">
              <HomeIcon size={18} />
              Inicio
            </Link>
          </Button>
        </SheetClose>
        <Button variant="ghost" className="justify-start gap-2">
          <CalendarIcon size={18} />
          Agendamentos
        </Button>
      </div>

      <div className="flex flex-col gap-2 border-b border-solid py-5">
        {quickSearchOptions.map((option) => (
          <SheetClose asChild key={option.label}>
            <Button variant="ghost" className="justify-start gap-3" asChild>
              <Link href={`/barbershops?service=${option.label}`}>
                <Image
                  src={option.icon}
                  height={18}
                  width={18}
                  alt={option.label}
                />
                {option.label}
              </Link>
            </Button>
          </SheetClose>
        ))}
      </div>

      {data?.user && (
        <div className="flex flex-col gap-2 py-5">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="justify-start gap-3">
                <LogOutIcon size={18} />
                Sair da conta
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[70%] justify-center">
              <DialogHeader>
                <DialogTitle className="flex justify-center">Sair</DialogTitle>
                <DialogDescription>
                  Deseja mesmo sair da plataforma?
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-between gap-3">
                <DialogClose asChild>
                  <Button variant="outline" className="w-full">
                    Cancelar
                  </Button>
                </DialogClose>
                <Button
                  variant="destructive"
                  onClick={handleLogountClick}
                  className="w-full"
                >
                  Sair
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </SheetContent>
  )
}

export default SidebarSheet
