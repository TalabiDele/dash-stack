// /app/register/action.ts

'use server'

import { db } from '@/server'
import { users } from '@/server/schema'
import { RegisterSubmit } from '@/utils/types'
import { nanoid } from 'nanoid'

const action = async (formData: RegisterSubmit) => {
	const isAlreadyRegistered = (await db.select().from(users)).find(
		(user) => user.email === formData.email
	)

	if (isAlreadyRegistered) {
		return {
			message: 'Email already registered',
			status: false,
		}
	}

	await db.insert(users).values({
		...formData,
	})

	return {
		message: 'User registered successfully',
		status: true,
	}
}

export default action
