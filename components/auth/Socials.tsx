'use client'

import React from 'react'
import { Button } from '@chakra-ui/react'
import { signIn } from '@/server/auth'
import { GoogleSignIn } from '@/server/actions/GoogleSIgnIn'
import { GithubSignIn } from '@/server/actions/GithubSignIn'

const Socials = () => {
	return (
		<div>
			<Button onClick={() => GoogleSignIn()}>Sign in with Google</Button>
			<Button onClick={() => GithubSignIn()}>Sign in with Github</Button>
		</div>
	)
}

export default Socials
