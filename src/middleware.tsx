import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'; 
export async function middleware(request: Request) {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get('accessToken')?.value;

  const url = new URL(request.url);

  if (accessToken) {
    return NextResponse.next();
  }

  if (url.pathname !== 'https://dashboard-rose-ten-79.vercel.app/Login') {
    return NextResponse.redirect(new URL('https://dashboard-rose-ten-79.vercel.app/Login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['https://dashboard-rose-ten-79.vercel.app/','https://dashboard-rose-ten-79.vercel.app/users','https://dashboard-rose-ten-79.vercel.app/employee','https://dashboard-rose-ten-79.vercel.app/employee/:path'], 
};
