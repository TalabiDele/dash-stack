import * as z from 'zod'

export const registerFormSchema = z
	.object({
		// New fields: firstName, lastName, and email
		firstName: z
			.string()
			.min(1, { message: 'First name is required.' })
			.max(50, { message: 'First name cannot exceed 50 characters.' }),
		lastName: z
			.string()
			.min(1, { message: 'Last name is required.' })
			.max(50, { message: 'Last name cannot exceed 50 characters.' }),
		email: z
			.string()
			.min(1, { message: 'Email is required.' })
			.email({ message: 'Invalid email address.' }),
		password: z
			.string()
			.min(8, { message: 'Password must be at least 8 characters long.' })
			.regex(/[a-z]/, {
				message: 'Password must contain at least one lowercase letter.',
			})
			.regex(/[A-Z]/, {
				message: 'Password must contain at least one uppercase letter.',
			})
			.regex(/[0-9]/, { message: 'Password must contain at least one number.' })
			.regex(/[^a-zA-Z0-9]/, {
				message: 'Password must contain at least one special character.',
			}),
		confirmPassword: z
			.string()
			.min(1, { message: 'Confirm password is required.' }), // Basic required check
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match.',
		path: ['confirmPassword'], // Set the error message on the confirmPassword field
	})

export const registerSchema = z.object({
	// New fields: firstName, lastName, and email
	firstName: z
		.string()
		.min(1, { message: 'First name is required.' })
		.max(50, { message: 'First name cannot exceed 50 characters.' }),
	lastName: z
		.string()
		.min(1, { message: 'Last name is required.' })
		.max(50, { message: 'Last name cannot exceed 50 characters.' }),
	email: z
		.string()
		.min(1, { message: 'Email is required.' })
		.email({ message: 'Invalid email address.' }),
	password: z
		.string()
		.min(8, { message: 'Password must be at least 8 characters long.' })
		.regex(/[a-z]/, {
			message: 'Password must contain at least one lowercase letter.',
		})
		.regex(/[A-Z]/, {
			message: 'Password must contain at least one uppercase letter.',
		})
		.regex(/[0-9]/, { message: 'Password must contain at least one number.' })
		.regex(/[^a-zA-Z0-9]/, {
			message: 'Password must contain at least one special character.',
		}),
})

export const loginSchema = z.object({
	email: z
		.string()
		.min(1, { message: 'Email is required.' })
		.email({ message: 'Invalid email address.' }),
	password: z
		.string()
		.min(8, { message: 'Password must be at least 8 characters long.' }),
})
