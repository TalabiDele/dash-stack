'use client'

import React from 'react'
import AuthCard from './AuthCard'
import { useForm } from 'react-hook-form'
import { Button, Field, Input, Stack } from '@chakra-ui/react'
import ButtonComponent from '../ui/buttons/submit-button'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

type FormValues = {
	firstName: string
	lastName: string
	email: string
	password: string
	confirmPassword: string
}

const registerFormSchema = z
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

const RegisterForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormValues>({
		resolver: zodResolver(registerFormSchema),
	})

	const onSubmit = handleSubmit((data) => {
		console.log(data)
	})

	return (
		<div className=''>
			<AuthCard
				cardTitle='Welcome'
				cardDescription='Register a new account'
				backButtonHref='/auth/login'
				backButtonLabel='Login to your account'
				showSocials
			>
				<form onSubmit={onSubmit}>
					<Stack gap='4' align='flex-start' maxW='lg'>
						<Field.Root invalid={!!errors.firstName}>
							<Field.Label>First Name</Field.Label>
							<Input
								{...register('firstName', {
									required: 'First name is required',
								})}
								placeholder='Enter first name'
								type='text'
							/>
							<Field.ErrorText>{errors.email?.message}</Field.ErrorText>
						</Field.Root>
						<Field.Root invalid={!!errors.email}>
							<Field.Label>Email</Field.Label>
							<Input
								{...register('email', { required: 'Email is required' })}
								placeholder='Enter email'
								type='email'
							/>
							<Field.ErrorText>{errors.email?.message}</Field.ErrorText>
						</Field.Root>

						<Field.Root invalid={!!errors.password}>
							<Field.Label>Password</Field.Label>
							<Input
								{...register('password', { required: 'Password is required' })}
								placeholder='Enter password'
								type='password'
							/>
							<Field.ErrorText>{errors.password?.message}</Field.ErrorText>
						</Field.Root>
						<Field.Root invalid={!!errors.confirmPassword}>
							<Field.Label>Confirm Password</Field.Label>
							<Input
								{...register('confirmPassword', {
									required: 'Confirm password is required',
								})}
								placeholder='Enter confirm password'
								type='password'
							/>
							<Field.ErrorText>
								{errors.confirmPassword?.message}
							</Field.ErrorText>
						</Field.Root>

						<ButtonComponent buttonText='Register' />
					</Stack>
				</form>
			</AuthCard>
		</div>
	)
}

export default RegisterForm
