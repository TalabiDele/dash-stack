import { toaster } from '@/components/ui/toaster'

export const showToast = (status: boolean, message: string) => {
	toaster.create({
		description: message,
		type: status ? 'success' : 'error',
	})
}
