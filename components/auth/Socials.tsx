'use client'

import React from 'react'
import { Button, IconButton, Stack } from '@chakra-ui/react'
import { signIn } from '@/server/auth'
import { GoogleSignIn } from '@/server/actions/GoogleSIgnIn'
import { GithubSignIn } from '@/server/actions/GithubSignIn'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

const Socials = () => {
	return (
		<>
			<IconButton
				aria-label='Google sign in'
				onClick={() => GoogleSignIn()}
				borderRadius={'full'}
			>
				<FcGoogle />
			</IconButton>
			<IconButton
				aria-label='Google sign in'
				onClick={() => GithubSignIn()}
				borderRadius={'full'}
			>
				<FaGithub />
			</IconButton>
		</>
	)
}

export default Socials
