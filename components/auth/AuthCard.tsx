import React from 'react'
import { Button, Card, Field, Input, Stack } from '@chakra-ui/react'
import Socials from './Socials'
import BackButton from './back-button'

type CardWrapperProps = {
	children: React.ReactNode
	cardTitle: string
	backButtonHref: string
	backButtonLabel: string
	showSocials?: boolean
	cardDescription: string
}

const AuthCard = ({
	children,
	cardTitle,
	backButtonHref,
	backButtonLabel,
	showSocials,
	cardDescription,
}: CardWrapperProps) => {
	return (
		<Card.Root maxW='lg' bgColor={'bg.subtle'}>
			<Card.Header>
				<Card.Title>{cardTitle}</Card.Title>
				<Card.Description>{cardDescription}</Card.Description>
			</Card.Header>
			<Card.Body>{children}</Card.Body>
			{showSocials && (
				<Card.Footer justifyContent='flex-end'>
					<Socials />
				</Card.Footer>
			)}
			<Card.Footer>
				<BackButton href={backButtonHref} label={backButtonLabel} />
			</Card.Footer>
		</Card.Root>
	)
}

export default AuthCard
