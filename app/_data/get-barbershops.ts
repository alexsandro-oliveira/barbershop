"use server"

import { db } from "../_lib/prisma"

interface BarbershopsPageProps {
  searchParams: {
    title?: string
    service?: string
  }
}

export const getBarbershops = async ({
  searchParams,
}: BarbershopsPageProps) => {
  return db.barbershop.findMany({
    where: {
      OR: [
        searchParams?.title
          ? {
              name: {
                contains: searchParams?.title,
                mode: "insensitive",
              },
            }
          : {},
        searchParams?.service
          ? {
              services: {
                some: {
                  name: {
                    contains: searchParams.service,
                    mode: "insensitive",
                  },
                },
              },
            }
          : {},
      ],
    },
  })
}
