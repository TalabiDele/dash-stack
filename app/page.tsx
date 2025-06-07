import getProducts from '@/server/actions/get-products'
import Image from 'next/image'

export default async function Home() {
	const data = await getProducts()

	console.log(data)

	return (
		<div className=''>
			<div className=''></div>
		</div>
	)
}
