'use server'

import { db } from '@/server/index'
import { products } from '@/migrations/schema'
import { revalidatePath } from 'next/cache'

export default async function createProducts(formData: FormData) {
	const title = formData.get('title')?.toString()
	const description = formData.get('description')?.toString()
	const price = Number(formData.get('price'))
	const updatedAt = new Date().toISOString()

	if (!title) {
		return { error: 'Title is required' }
	}

	if (!description) {
		return { error: 'Description is required' }
	}

	if (!price) {
		return { error: 'Price is required' }
	}

	revalidatePath('/')

	try {
		await db.insert(products).values({
			title,
			description,
			price,
			updatedAt,
		})

		return { success: 'Product created' }
	} catch (error) {
		console.error('Error creating product:', error)
		return { error: 'Failed to create product. Check server logs.' }
	}
}
