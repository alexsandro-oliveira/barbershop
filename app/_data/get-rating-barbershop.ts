"use server"

import { db } from "../_lib/prisma"

interface GetRatingBarbershopProps {
  id: string
}

export const getRatingBarbershop = async ({ id }: GetRatingBarbershopProps) => {
  const rating = await db.rating.aggregate({
    _count: true,
    _sum: {
      rating: true,
    },
    where: {
      barbershopId: id,
    },
  })

  return {
    totalRatings: rating._count,
    rating:
      rating._sum.rating == null
        ? (0).toFixed(1)
        : (rating._sum.rating / rating._count).toFixed(1),
  }
}
