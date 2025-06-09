'use client'

import React from 'react'
import AuthCard from './AuthCard'
import { useForm } from 'react-hook-form'
import { Button, Field, Input, Stack } from '@chakra-ui/react'
import ButtonComponent from '../ui/buttons/submit-button'
import Link from 'next/link'
import { ForgotPasswordFormValues } from '@/utils/types'

const ForgotPasswordForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ForgotPasswordFormValues>()

	const onSubmit = handleSubmit((data) => {
		console.log(data)
	})

	return (
		<div className=''>
			<AuthCard
				cardTitle='Forgot Password'
				cardDescription='Change your password'
				backButtonHref='/auth/login'
				backButtonLabel='Back to Login'
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

						<ButtonComponent buttonText='Submit' />
					</Stack>
				</form>
			</AuthCard>
		</div>
	)
}

export default ForgotPasswordForm
