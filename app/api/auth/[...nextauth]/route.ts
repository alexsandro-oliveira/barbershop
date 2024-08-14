import { db } from "@/app/_lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import type { Adapter } from "next-auth/adapters"
import GooglePrivider from "next-auth/providers/google"

const handler = NextAuth({
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GooglePrivider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
})

export { handler as GET, handler as POST }
