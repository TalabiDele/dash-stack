import { Button } from '@chakra-ui/react'
import React from 'react'

const ButtonComponent = ({ buttonText }: { buttonText: string }) => {
	return (
		<Button type='submit' w={'100%'} bg={'brand.100'} color={'white'}>
			{buttonText}
		</Button>
	)
}

export default ButtonComponent
