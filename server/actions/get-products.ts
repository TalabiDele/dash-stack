'use server'

import { db } from '@/server'

export default async function getProducts() {
	const products = await db.query.productsTable.findMany()

	if (!products) {
		return { error: 'No products found' }
	}

	return { success: products }
}
