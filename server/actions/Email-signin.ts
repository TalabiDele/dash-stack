'use server'

import type { LoginFormValues } from '@/utils/types'
import { createSafeActionClient } from 'next-safe-action'
import { z } from 'zod'
// import { signIn } from 'next-auth/react'
import { action } from '@/lib/safe-action'

const loginSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const emailSignIn = action(
	loginSchema,
	async ({ email, password }) => {}
)
