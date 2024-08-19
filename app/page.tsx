import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import Image from "next/image"
import { db } from "./_lib/prisma"
import BarbershopItens from "./_components/barbershop-item"
import { quickSearchOptions } from "./_constants/quickSearch"
import BookingItem from "./_components/booking-item"
import Search from "./_components/search"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/auth"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

const Home = async () => {
  const session = await getServerSession(authOptions)
  //chamar o banco de dados
  const [barbershops, popularBarbershops, confirmedBookings] =
    await Promise.all([
      db.barbershop.findMany({}),
      db.barbershop.findMany({
        orderBy: {
          name: "desc",
        },
      }),

      session?.user
        ? db.booking.findMany({
            where: {
              userId: (session.user as any).id,
              date: {
                gte: new Date(),
              },
            },
            include: {
              service: { include: { barbershop: true } },
            },
            orderBy: {
              date: "asc",
            },
          })
        : Promise.resolve([]),
    ])

  return (
    <div>
      {/* header */}
      <Header />
      <div className="p-5">
        {/* TEXTO */}
        <h2 className="text-xl font-bold">
          {session?.user
            ? `Olá, ${session.user.name?.split(" ")[0]}!`
            : "Olá, vamos agendar um serviço hoje?"}
        </h2>
        <p className="mt-2 text-sm">
          <span className="capitalize">
            {format(new Date(), "EEEE, dd", {
              locale: ptBR,
            })}
          </span>
          <span>&nbsp;de&nbsp; </span>
          <span className="capitalize">
            {format(new Date(), "MMMM", {
              locale: ptBR,
            })}
          </span>
        </p>

        {/* BUSCA */}
        <div className="mt-6">
          <Search />
        </div>

        {/* BUSCA RAPIDA */}
        <div className="[&:: webkit-scrollbar]:hidden mt-6 flex gap-3 overflow-x-auto">
          {quickSearchOptions.map((option) => (
            <Button
              asChild
              className="gap-2"
              variant="secondary"
              key={option.label}
            >
              <Link href={`/barbershops?service=${option.label}`}>
                <Image
                  src={option.icon}
                  width={16}
                  height={16}
                  alt={option.label}
                />
                {option.label}
              </Link>
            </Button>
          ))}
        </div>

        {/* BANNER */}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src="/banner-01.png"
            alt="Agende nos melhores com Barber Shop"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {/* AGENDAMENTO */}
        <h2 className="mb-3 mt-6 font-bold uppercase text-gray-400">
          Agendamentos
        </h2>

        <div className="[&:: webkit-scrollbar]:hidden flex gap-3 overflow-x-auto">
          {confirmedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>

        <h2 className="mb-3 mt-6 font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="[&:: webkit-scrollbar]:hidden flex gap-4 overflow-auto">
          {barbershops.map((barbershop) => (
            <BarbershopItens key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        <h2 className="mb-3 mt-6 font-bold uppercase text-gray-400">
          Populares
        </h2>
        <div className="[&:: webkit-scrollbar]:hidden flex gap-4 overflow-auto">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItens key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
