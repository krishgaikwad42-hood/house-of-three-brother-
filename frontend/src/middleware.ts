import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const ADMIN_ROUTES = [
    '/admin',
    '/admin/dashboard',
    '/admin/products',
    '/admin/orders',
    '/admin/customers',
    '/admin/users',
];

const ADMIN_LOGIN_PAGE = '/admin/login';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the route is an admin route (but NOT the login page itself)
    const isAdminRoute = ADMIN_ROUTES.some(route =>
        pathname === route || pathname.startsWith(route + '/')
    );
    const isAdminLoginPage = pathname === ADMIN_LOGIN_PAGE;

    if (!isAdminRoute) {
        return NextResponse.next();
    }

    // Get token from httpOnly cookie
    const token = request.cookies.get('token')?.value;

    if (!token) {
        // Not logged in → redirect to admin login
        const loginUrl = new URL(ADMIN_LOGIN_PAGE, request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    try {
        // Verify JWT using jose (edge-runtime compatible)
        const secret = new TextEncoder().encode(
            process.env.JWT_ACCESS_SECRET || 'fallback_access_secret'
        );
        const { payload } = await jwtVerify(token, secret);

        // CRITICAL: Check that the role is admin
        if (payload.role !== 'admin') {
            // Authenticated but not admin → redirect to home
            return NextResponse.redirect(new URL('/', request.url));
        }

        // Admin verified → allow through
        return NextResponse.next();
    } catch (err) {
        // Invalid/expired token → redirect to admin login
        const loginUrl = new URL(ADMIN_LOGIN_PAGE, request.url);
        loginUrl.searchParams.set('redirect', pathname);
        const response = NextResponse.redirect(loginUrl);
        // Clear the invalid cookie
        response.cookies.delete('token');
        return response;
    }
}

export const config = {
    matcher: [
        '/admin',
        '/admin/:path*',
    ],
};
