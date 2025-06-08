'use client'

import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

type BackButtonType = {
	href: string
	label: string
}

const BackButton = ({ href, label }: BackButtonType) => {
	return (
		<div>
			<Button bg={'none'} color={'white'} _hover={{}}>
				<Link aria-label={label} href={href}>
					{label}
				</Link>
			</Button>
		</div>
	)
}

export default BackButton
