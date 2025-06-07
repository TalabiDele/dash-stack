'use client'

import React from 'react'
import { Button } from '@chakra-ui/react'
import { signIn } from 'next-auth/react'

const Socials = () => {
	return (
		<div>
			<Button
				onClick={() =>
					signIn('google', {
						redirect: false,
						callback: '/',
					})
				}
			>
				Sign in with Google
			</Button>
			<Button
				onClick={() =>
					signIn('github', {
						redirect: false,
						callback: '/',
					})
				}
			>
				Sign in with Github
			</Button>
		</div>
	)
}

export default Socials
