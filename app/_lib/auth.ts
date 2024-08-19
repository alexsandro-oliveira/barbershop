import { PrismaAdapter } from "@auth/prisma-adapter"
import type { AuthOptions } from "next-auth"
import { db } from "./prisma"
import type { Adapter } from "next-auth/adapters"
import GooglePrivider from "next-auth/providers/google"

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GooglePrivider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user = {
        ...session.user,
        id: user.id,
      } as any
      return session
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
}
