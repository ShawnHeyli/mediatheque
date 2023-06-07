import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next();

  res.headers.set('X-Frame-Options', 'SAMEORIGIN'); // Prevent Clickjacking attacks
  res.headers.set('X-XSS-Protection', '1; mode=block') ; // Enable XSS filtering
  res.headers.set('X-Content-Type-Options', 'nosniff'); // Prevent MIME type sniffing
  res.headers.set('Referrer-Policy', 'no-referrer'); // Hide the Referer header when leaving your site
  res.headers.set('Content-Security-Policy', "default-src *; style-src 'self' 'unsafe-inline'; script-src 'unsafe-eval' 'self'; image-src *"); // Limit resources to only come from your site
  
    // Check if the request is a POST request
  if (req.method === 'POST') {
    // Validate the CSRF token to prevent CSRF attacks
    const csrfToken = req.headers.get('X-CSRF-Token');
    if (typeof csrfToken === 'string' && csrfToken !== process.env.CSRF_TOKEN) {
      // Return a 403 Forbidden response if the CSRF token is invalid
      return NextResponse.forbidden('CSRF token invalid');
    }
  }

  const supabase = createMiddlewareClient({ req, res });
  await supabase.auth.getSession();
  return res;
}
