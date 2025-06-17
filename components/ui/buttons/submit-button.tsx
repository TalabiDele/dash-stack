import { Button } from '@chakra-ui/react'
import React from 'react'

const ButtonComponent = ({
	buttonText,
	isLoading,
}: {
	buttonText: string
	isLoading: boolean
}) => {
	return (
		<Button
			type='submit'
			w={'100%'}
			bg={'brand.100'}
			color={'white'}
			loading={isLoading}
		>
			{buttonText}
		</Button>
	)
}

export default ButtonComponent
