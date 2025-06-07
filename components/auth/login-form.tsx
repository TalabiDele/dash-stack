'use client'

import React from 'react'
import AuthCard from './AuthCard'

const LoginForm = () => {
	return (
		<AuthCard
			cardTitle='Welcome Back'
			cardDescription='Login to your account'
			backButtonHref='/auth/register'
			backButtonLabel='Create a new account'
			showSocials
		>
			<div className=''></div>
		</AuthCard>
	)
}

export default LoginForm
