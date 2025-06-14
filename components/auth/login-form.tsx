'use client'

import React from 'react'
import AuthCard from './AuthCard'
import { useForm } from 'react-hook-form'
import { Button, Field, Input, Stack } from '@chakra-ui/react'
import ButtonComponent from '../ui/buttons/submit-button'
import Link from 'next/link'
import { LoginFormValues } from '@/utils/types'

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<LoginFormValues>()

	const onSubmit = handleSubmit((data) => {
		console.log(data)
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

						<ButtonComponent buttonText='Login' />
					</Stack>
				</form>
			</AuthCard>
		</div>
	)
}

export default LoginForm
