import BarbershopItens from "../_components/barbershop-item"
import Header from "../_components/header"
import Search from "../_components/search"
import { getBarbershops } from "../_data/get-barbershops"

interface BarbershopsPageProps {
  searchParams: {
    title?: string
    service?: string
  }
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  const barbershops = await getBarbershops({ searchParams })

  return (
    <div>
      <Header />
      <div className="p-5">
        <div className="mt-6">
          <Search />
        </div>

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Resultados para &quot;{searchParams?.title || searchParams?.service}
          &quot;
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {barbershops.map((barbershop) => (
            <BarbershopItens key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BarbershopsPage
