'use client'

import React from 'react'
import AuthCard from './AuthCard'
import { useForm } from 'react-hook-form'
import { Button, Field, Input, Stack } from '@chakra-ui/react'
import ButtonComponent from '../ui/buttons/submit-button'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterFormValues } from '@/utils/types'
import { registerFormSchema, registerSchema } from '@/utils/validationSchemas'
import action from '@/server/actions/register'
import { useRouter } from 'next/navigation'
import { showToast } from '@/utils/functions'

const RegisterForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<RegisterFormValues>({
		resolver: zodResolver(registerFormSchema),
	})

	const router = useRouter()

	const onSubmit = handleSubmit(async (data) => {
		const email = data?.email
		const firstName = data?.firstName
		const lastName = data?.lastName
		const password = data?.password

		try {
			const schemaResult = registerSchema.safeParse({
				email,
				password,
				firstName,
				lastName,
			})
			if (!schemaResult.success) {
				throw new Error(schemaResult.error.errors[0].message)
			}

			const res = await action(schemaResult.data)
			if (res && !res?.status) {
				showToast(res.status, res.message)
				// toast error
				return
			}

			showToast(res.status, res.message)

			router.push('/auth/login')
		} catch (error: any) {
			console.log(error)
			showToast(false, error?.message)
		}
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
								{...register('firstName')}
								placeholder='Enter first name'
								type='text'
							/>
							<Field.ErrorText>{errors.firstName?.message}</Field.ErrorText>
						</Field.Root>
						<Field.Root invalid={!!errors.lastName}>
							<Field.Label>Last Name</Field.Label>
							<Input
								{...register('lastName')}
								placeholder='Enter last name'
								type='text'
							/>
							<Field.ErrorText>{errors.lastName?.message}</Field.ErrorText>
						</Field.Root>
						<Field.Root invalid={!!errors.email}>
							<Field.Label>Email</Field.Label>
							<Input
								{...register('email')}
								placeholder='Enter email'
								type='email'
							/>
							<Field.ErrorText>{errors.email?.message}</Field.ErrorText>
						</Field.Root>

						<Field.Root invalid={!!errors.password}>
							<Field.Label>Password</Field.Label>
							<Input
								{...register('password')}
								placeholder='Enter password'
								type='password'
							/>
							<Field.ErrorText>{errors.password?.message}</Field.ErrorText>
						</Field.Root>
						<Field.Root invalid={!!errors.confirmPassword}>
							<Field.Label>Confirm Password</Field.Label>
							<Input
								{...register('confirmPassword')}
								placeholder='Enter confirm password'
								type='password'
							/>
							<Field.ErrorText>
								{errors.confirmPassword?.message}
							</Field.ErrorText>
						</Field.Root>

						<ButtonComponent buttonText='Register' isLoading={isSubmitting} />
					</Stack>
				</form>
			</AuthCard>
		</div>
	)
}

export default RegisterForm
