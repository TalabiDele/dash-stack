export type CardWrapperProps = {
	children: React.ReactNode
	cardTitle: string
	backButtonHref: string
	backButtonLabel: string
	showSocials?: boolean
	cardDescription: string
}

export type BackButtonType = {
	href: string
	label: string
}

export type LoginFormValues = {
	email: string
	password: string
}

export type RegisterFormValues = {
	firstName: string
	lastName: string
	email: string
	password: string
	confirmPassword: string
}

export type RegisterSubmit = {
	firstName: string
	lastName: string
	email: string
	password: string
}

export type ForgotPasswordFormValues = {
	email: string
}

export type LoginType = {
	id: string
	email: string
	password: string
}
