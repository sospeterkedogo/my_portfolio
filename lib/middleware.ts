import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/admin',          // matches exactly /admin
    '/admin/:path*',   // matches /admin/* (blog, projects, etc.)
  ],
}