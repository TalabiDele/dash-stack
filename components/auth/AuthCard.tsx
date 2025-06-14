import React from 'react'
import { Button, Card, Center, Field, Input, Stack } from '@chakra-ui/react'
import Socials from './Socials'
import BackButton from './back-button'
import Logo from '../ui/logo'
import { CardWrapperProps } from '@/utils/types'

const AuthCard = ({
	children,
	cardTitle,
	backButtonHref,
	backButtonLabel,
	showSocials,
	cardDescription,
}: CardWrapperProps) => {
	return (
		<div className=' flex h-[100vh] items-center'>
			<Card.Root
				w='lg'
				bgColor={'bg.subtle'}
				justifyContent={'center'}
				mx={'auto'}
			>
				<Card.Header>
					<Logo />
					<Card.Title>{cardTitle}</Card.Title>
					<Card.Description>{cardDescription}</Card.Description>
				</Card.Header>
				<Card.Body>{children}</Card.Body>
				{showSocials && (
					<>
						<Center mb={'1rem'}>Or sign in with</Center>
						<Card.Footer justifyContent='center'>
							<Socials />
						</Card.Footer>
					</>
				)}
				<Card.Footer justifyContent='center'>
					<BackButton href={backButtonHref} label={backButtonLabel} />
				</Card.Footer>
			</Card.Root>
		</div>
	)
}

export default AuthCard
