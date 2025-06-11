import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const dashboardApi = createApi({
	reducerPath: 'dashboardApi',
	refetchOnFocus: false,
	baseQuery: fetchBaseQuery({
		baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}`,
	}),

	endpoints: (builder) => ({}),
})
