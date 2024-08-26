"use server"

import { db } from "../_lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../_lib/auth"
import { revalidatePath } from "next/cache"

interface CreateRatingParams {
  rating: number
  barbershopId: string
}

export const createRating = async (params: CreateRatingParams) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error("Usuário não autenticado")
  }

  await db.rating.create({
    data: {
      ...params,
      userId: (session.user as any).id,
    },
  })
  revalidatePath("/barbershops/{id}")
  revalidatePath("/bookings")
}
