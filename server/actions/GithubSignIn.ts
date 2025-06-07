'use server'
import { signIn } from '@/server/auth'

export async function GithubSignIn() {
	return await signIn('github')
}
