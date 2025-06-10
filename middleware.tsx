// import { auth } from '@/server/auth'
// import { NextResponse } from 'next/server'

// import { NextRequest, NextResponse } from 'next/server'

// export default auth((req) => {
// 	const { auth, nextUrl } = req
// 	const isAuthenticated = !!auth?.user

// 	console.log('middleware', auth)

// 	const protectedPaths = ['/dashboard', '/protected-server']

// 	const unauthenticatedPaths = ['/login', '/register', '/forgot-password']

// 	if (isAuthenticated && unauthenticatedPaths.includes(nextUrl.pathname)) {
// 		// Construct the URL to redirect to a protected dashboard
// 		const dashboardUrl = new URL('/dashboard', nextUrl.origin)
// 		return NextResponse.redirect(dashboardUrl)
// 	}

// 	if (protectedPaths.includes(nextUrl.pathname) && !isAuthenticated) {
// 		// Construct the URL for the login page, adding a callbackUrl.
// 		// The callbackUrl ensures the user is redirected back to their intended page after login.
// 		const loginUrl = new URL('/login', nextUrl.origin)
// 		loginUrl.searchParams.set('callbackUrl', nextUrl.pathname)
// 		return NextResponse.redirect(loginUrl)
// 	}

// 	return NextResponse.next()
// })

// export function middleware(request: NextRequest) {
// 	console.log(request.url)

// 	console.log('Middleware running')

// 	return NextResponse.redirect('/auth/login')
// }

// export const config = {
// 	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|auth/login).*)'],
// 	// matcher: '/dashboard/:path*',
// }

// middleware.js - Alternative approach using request headers
import { NextResponse, NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
	console.log('🔥 Middleware running for:', request.nextUrl.pathname)

	const { pathname } = request.nextUrl

	// Check for session token in cookies (simpler approach)
	const sessionToken =
		request.cookies.get('authjs.session-token')?.value ||
		request.cookies.get('__Secure-next-auth.session-token')?.value

	const isLoggedIn = !!sessionToken
	console.log('🔐 Session exists:', isLoggedIn)

	// Define your routes
	const authRoutes = ['/auth/login', '/auth/register', '/auth/forgot-password']
	const protectedRoutes = ['/dashboard', '/profile', '/settings']
	const publicRoutes = ['/', '/about', '/contact']

	const isAuthRoute = authRoutes.includes(pathname)
	const isProtectedRoute = protectedRoutes.some((route) =>
		pathname.startsWith(route)
	)
	const isPublicRoute = publicRoutes.includes(pathname)
	const isApiRoute = pathname.startsWith('/api')

	// Skip middleware for API routes
	if (isApiRoute) {
		return NextResponse.next()
	}

	// Redirect authenticated users away from auth pages
	if (isLoggedIn && isAuthRoute) {
		console.log('✅ Redirecting authenticated user to dashboard')
		return NextResponse.redirect(new URL('/dashboard', request.url))
	}

	// Redirect unauthenticated users from protected pages
	if (!isLoggedIn && isProtectedRoute) {
		console.log('❌ Redirecting to login')
		const loginUrl = new URL('/auth/login', request.url)
		loginUrl.searchParams.set('callbackUrl', pathname)
		return NextResponse.redirect(loginUrl)
	}

	// Allow public routes
	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
