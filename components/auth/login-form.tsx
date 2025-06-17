'use client'

import React from 'react'
import AuthCard from './AuthCard'
import { useForm } from 'react-hook-form'
import { Button, Field, Input, Stack } from '@chakra-ui/react'
import ButtonComponent from '../ui/buttons/submit-button'
import Link from 'next/link'
import { LoginFormValues } from '@/utils/types'
import { loginSchema } from '@/utils/validationSchemas'
import action from '@/server/actions/Email-signin'
import { showToast } from '@/utils/functions'

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
		formState: { errors },
		reset,
	} = useForm<LoginFormValues>()

	const onSubmit = handleSubmit(async (data) => {
		console.log(data)

		try {
			const email = data?.email
			const password = data?.password
			const schemaResult = loginSchema.safeParse({ email, password })

			if (!schemaResult.success) {
				throw new Error(schemaResult.error.errors[0].message)
			}

			const res = await action(schemaResult.data)
			if (res && !res?.status) {
				// toast error
				showToast(res?.status, res?.message)
				return
			}

			showToast(res?.status, res?.message)
		} catch (error: any) {
			console.error(error.message || 'Something went wrong')
		}
	})

	return (
		<div className=''>
			<AuthCard
				cardTitle='Welcome Back'
				cardDescription='Login to your account'
				backButtonHref='/auth/register'
				backButtonLabel='Create a new account'
				showSocials
			>
				<form onSubmit={onSubmit}>
					<Stack gap='4' align='flex-start' maxW='lg'>
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

						<Stack _hover={{ color: 'brand.100' }}>
							<Link href={'/auth/forgot-password'}>Forgot Password?</Link>
						</Stack>

						<ButtonComponent buttonText='Login' isLoading={isSubmitting} />
					</Stack>
				</form>
			</AuthCard>
		</div>
	)
}

export default LoginForm
