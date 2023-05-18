import { NextResponse } from 'next/server';

export const config = {
  matcher: [ "/api/:path*", "/:path*" ],
};

export function middleware(request) {
  // Set some security headers to help protect against common web vulnerabilities
  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'SAMEORIGIN'); // Prevent Clickjacking attacks
  response.headers.set('X-XSS-Protection', '1; mode=block') ; // Enable XSS filtering
  response.headers.set('X-Content-Type-Options', 'nosniff'); // Prevent MIME type sniffing
  response.headers.set('Referrer-Policy', 'no-referrer'); // Hide the Referer header when leaving your site
  //response.headers.set('Content-Security-Policy', "default-src *; style-src 'self' 'unsafe-inline'; script-src 'unsafe-eval' 'self'; image-src *"); // Limit resources to only come from your site
  
  // Check if the request is a POST request
  if (request.method === 'POST') {
    // Validate the CSRF token to prevent CSRF attacks
    const csrfToken = request.headers.get('X-CSRF-Token');
    if (typeof csrfToken === 'string' && csrfToken !== process.env.CSRF_TOKEN) {
      // Return a 403 Forbidden response if the CSRF token is invalid
      return NextResponse.forbidden('CSRF token invalid');
    }
  }

  // Return the response with the added security headers
  return response;
}

export default middleware;