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
