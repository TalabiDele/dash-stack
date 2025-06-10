'use client'

import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { ColorModeProvider, type ColorModeProviderProps } from './color-mode'
import { system } from '../theme'
import ReduxProvider from '../ReduxProvider'

export function Provider(props: ColorModeProviderProps) {
	return (
		<ReduxProvider>
			<ChakraProvider value={system}>
				<ColorModeProvider {...props} />
			</ChakraProvider>
		</ReduxProvider>
	)
}
