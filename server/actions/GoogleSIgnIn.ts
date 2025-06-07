'use server'
import { signIn } from '@/server/auth'

export async function GoogleSignIn() {
	return await signIn('google')
}
