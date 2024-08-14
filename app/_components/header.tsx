import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { quickSearchOptions } from "../_constants/quickSearch"
import { Avatar, AvatarImage } from "./ui/avatar"
import Link from "next/link"

const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Image src="/logo.svg" alt="barger shop logo" height={40} width={150} />

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>

            <div className="flex items-center gap-3 border-b border-solid py-5">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="User avatar"
                />
              </Avatar>

              <div>
                <p className="font-bold">Alexs Santos</p>
                <p className="text-sm text-gray-300">ale.osantos@hotmail.com</p>
              </div>
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
              <Button variant="ghost" className="justify-start gap-3">
                <LogOutIcon size={18} />
                Sair da conta
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header
