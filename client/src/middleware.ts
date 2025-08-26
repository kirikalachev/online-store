import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Обект с пътища и роли:
// - ако ролята е null, значи всяка валидна роля минава
// - ако е масив, само посочените роли минават
const protectedRoutes: { [path: string]: string[] | null } = {
  '/admin': ['admin'],    // само админи
  '/profile': null,       // всички валидни роли
};

const publicAuthRoutes = ['/auth/login', '/auth/register'];

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || '');

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('accessToken')?.value;

  // --- Публични страници за логин/регистрация ---
  if (publicAuthRoutes.some(route => pathname.startsWith(route))) {
    if (token) {
      try {
        await jwtVerify(token, JWT_SECRET);
        return NextResponse.redirect(new URL('/', request.url));
      } catch {
        // невалиден токен, продължаваме към логин/регистрация
      }
    }
    return NextResponse.next();
  }

  // --- Проверка за защитени пътища ---
  for (const route in protectedRoutes) {
    if (pathname.startsWith(route)) {
      if (!token) {
        return NextResponse.redirect(new URL('/', request.url));
      }

      try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        const allowedRoles = protectedRoutes[route];

        // --- Ролевата проверка ---
        if (allowedRoles) {
          const userRole = (payload.role as string)?.toLowerCase();
          const roles = allowedRoles.map(r => r.toLowerCase());

          if (!userRole || !roles.includes(userRole)) {
            return NextResponse.redirect(new URL('/', request.url));
          }
        }

        // Всичко е ок
        return NextResponse.next();
      } catch {
        return NextResponse.redirect(new URL('/', request.url));
      }
    }
  }

  // /auth/login?error=unauthorized

  // Ако пътят не е защитен, продължаваме
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/profile/:path*',
    '/auth/login',
    '/auth/register',
  ],
};
