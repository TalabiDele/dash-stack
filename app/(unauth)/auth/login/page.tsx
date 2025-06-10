import LoginForm from '@/components/auth/login-form'
import React from 'react'
import { auth } from '@/server/auth'

const Login = async () => {
	const session = await auth()

	console.log(session)

	return (
		<div>
			<LoginForm />
		</div>
	)
}

export default Login
