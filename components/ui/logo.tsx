import { Center, Text } from '@chakra-ui/react'
import React from 'react'

const Logo = () => {
	return (
		<Text color={'brand.100'} fontWeight={'bold'} fontSize={'2rem'}>
			Dash<span className=' text-white'>Stack</span>
		</Text>
	)
}

export default Logo
