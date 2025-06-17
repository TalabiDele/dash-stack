// 'use server'

// import type { LoginFormValues } from '@/utils/types'
// import { createSafeActionClient } from 'next-safe-action'
// import { z } from 'zod'
// // import { signIn } from 'next-auth/react'
// import { action } from '@/lib/safe-action'

// const loginSchema = z.object({
// 	email: z.string().email('Invalid email address'),
// 	password: z.string().min(6, 'Password must be at least 6 characters'),
// })

// export const emailSignIn = action(
// 	loginSchema,
// 	async ({ email, password }) => {}
// )

// /app/login/action.ts

'use server'

import { signIn } from '../auth'
import { db } from '@/server'
import { users } from '@/server/schema'

type TFormData = {
	email: string
	password: string
}

const action = async (formData: TFormData) => {
	const { password, email } = formData
	const isUserExist = (await db.select().from(users)).find(
		(user) => user.email === email
	)

	if (!isUserExist) {
		return {
			message: 'User not found',
			status: false,
		}
	}

	const { password: existPassword, ...rest } = isUserExist
	const isPasswordMatch = existPassword === password

	if (!isPasswordMatch) {
		return {
			message: 'Password is incorrect',
			status: false,
		}
	}

	await signIn('credentials', {
		email: rest.email,
		name: rest.name,
		id: rest.id,
		redirect: true,
		redirectTo: '/dashboard',
	})

	return {
		message: 'User logged in successfully',
		status: true,
	}
}

export default action
