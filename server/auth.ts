import NextAuth from 'next-auth'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from '@/server'
import Google from 'next-auth/providers/google'
import Github from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'

export const { handlers, auth, signIn, signOut } = NextAuth({
	adapter: DrizzleAdapter(db),
	session: { strategy: 'jwt' },
	providers: [
		Credentials({
			name: 'Credentials',
			credentials: {
				email: {},
				id: {},
				name: {},
			},
			authorize: async ({ email, id, name }) => {
				const data = {
					email: email as string,
					id: id as string,
					name: name as string,
				}
				return data
			},
		}),
		Google({
			clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
			clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
		}),
		Github({
			clientId: process.env.NEXT_PUBLIC_GITHUB_ID!,
			clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET!,
		}),
	],
	secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
	pages: {
		signIn: '/auth/login',
	},
})
