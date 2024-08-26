"use server"

import { db } from "../_lib/prisma"

interface GetBarbershopsByIdProps {
  id: string
}

export const getBarbershopsById = async ({ id }: GetBarbershopsByIdProps) => {
  return await db.barbershop.findUnique({
    where: {
      id: id,
    },
    include: {
      services: true,
    },
  })
}
