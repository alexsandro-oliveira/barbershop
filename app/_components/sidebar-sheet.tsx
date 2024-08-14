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
import { signIn, signOut, useSession } from "next-auth/react"
import { Avatar, AvatarImage } from "./ui/avatar"

const SidebarSheet = () => {
  const { data } = useSession()
  const handleLoginWithGoogle = () => signIn("google")
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
              <DialogContent className="w-[90%]">
                <DialogHeader>
                  <DialogTitle>Faça login na plataforma</DialogTitle>
                  <DialogDescription>
                    Conecte-se usando sua conta do Google.
                  </DialogDescription>
                </DialogHeader>
                <Button
                  variant="outline"
                  className="text-base font-bold"
                  onClick={handleLoginWithGoogle}
                >
                  <Image
                    alt="login com google"
                    src="/googleIcon.svg"
                    width={18}
                    height={18}
                  />
                  oogle
                </Button>
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
          <Button
            key={option.label}
            variant="ghost"
            className="justify-start gap-3"
          >
            <Image
              src={option.icon}
              height={18}
              width={18}
              alt={option.label}
            />
            {option.label}
          </Button>
        ))}
      </div>

      <div className="flex flex-col gap-2 py-5">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="justify-start gap-3">
              <LogOutIcon size={18} />
              Sair da conta
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[70%]">
            <DialogHeader>
              <DialogTitle>Sair</DialogTitle>
              <DialogDescription>
                Deseja mesmo sair da plataforma?
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-between">
              <DialogClose asChild>
                <Button variant="outline" className="w-[134px]">
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                variant="destructive"
                className="w-[134px]"
                onClick={handleLogountClick}
              >
                Sair
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </SheetContent>
  )
}

export default SidebarSheet
