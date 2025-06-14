import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
	theme: {
		semanticTokens: {
			colors: {
				brand: {
					50: { value: 'rgba(72, 128, 255, 0.15)' },
					100: { value: '#4880FF' },
				},
				bg: {
					DEFAULT: {
						value: { _light: '{colors.white}', _dark: '#1B2431' }, // Custom dark background
					},
					subtle: {
						value: { _light: '{colors.gray.50}', _dark: '#273142' }, // Custom dark subtle background
					},
					muted: {
						value: { _light: '{colors.gray.100}', _dark: '#262626' }, // Custom dark muted background
					},
				},
				fg: {
					DEFAULT: {
						value: { _light: '{colors.black}', _dark: '#FFFFFF' }, // Custom dark text color
					},
					muted: {
						value: { _light: '{colors.gray.600}', _dark: '#a3a3a3' }, // Custom dark muted text
					},
				},
				border: {
					DEFAULT: {
						value: { _light: '{colors.gray.200}', _dark: '#313d4f' }, // Custom dark border
					},
				},
			},
		},
	},
})

export const system = createSystem(defaultConfig, config)
