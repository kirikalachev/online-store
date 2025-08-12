// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { jwtVerify } from 'jose';

// const protectedRoutes = ['/admin']; // Може да добавиш други защитени пътища
// const publicAuthRoutes = ['/auth/login', '/auth/register']; // Страници за вход и регистрация

// // Трябва да е строго настроена стойност в .env, видима в edge runtime (не използвай NEXT_PUBLIC_)
// const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || '');

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   // Ако потребителят се опитва да посети login или register страница
//   if (publicAuthRoutes.some(route => pathname.startsWith(route))) {
//     const token = request.cookies.get('accessToken')?.value;

//     if (token) {
//       try {
//         // Опитай да валидираш токена, за да провериш дали е валиден
//         await jwtVerify(token, JWT_SECRET);
//         // Ако е валиден, пренасочи към начална (може да промениш на dashboard или др.)
//         return NextResponse.redirect(new URL('/', request.url));
//       } catch {
//         // Ако не е валиден токен, просто продължаваме към логин/регистрация
//       }
//     }
//   }

//   // Защитени маршрути - проверка за валиден token и admin role
//   if (protectedRoutes.some((route) => pathname.startsWith(route))) {
//     const token = request.cookies.get('accessToken')?.value;

//     if (!token) {
//       // Няма токен — пренасочваме към логин
//       return NextResponse.redirect(new URL('/auth/login', request.url));
//     }

//     try {
//       const { payload } = await jwtVerify(token, JWT_SECRET);

//       if (!payload.role || payload.role !== 'admin') {
//         // Токенът е валиден, но потребителят няма admin права
//         return NextResponse.redirect(new URL('/', request.url));
//       }

//       // Токенът е валиден и потребителят е админ — продължаваме
//       return NextResponse.next();
//     } catch (err) {
//       // Невалиден или изтекъл токен — пренасочваме към логин
//       return NextResponse.redirect(new URL('/auth/login?error=unauthorized', request.url));
//     }
//   }

//   // Ако пътят не е защитен, просто продължаваме
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/admin/:path*', '/auth/login', '/auth/register'], // Добави други маршрути, ако е нужно
// };


import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Обект с пътища и роли:
// - ако ролята е null, значи всяка валидна роля минава
// - ако е масив, само посочените роли минават
const protectedRoutes: { [path: string]: string[] | null } = {
  '/admin': ['admin'],    // само админи
  '/profile': null,       // всички валидни роли
  // добави други маршрути и роли тук
};

const publicAuthRoutes = ['/auth/login', '/auth/register'];

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || '');

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // За страници за логин/регистрация — ако има валиден токен, пренасочваме
  if (publicAuthRoutes.some(route => pathname.startsWith(route))) {
    const token = request.cookies.get('accessToken')?.value;

    if (token) {
      try {
        await jwtVerify(token, JWT_SECRET);
        return NextResponse.redirect(new URL('/', request.url));
      } catch {
        // невалиден токен, продължаваме към логин/регистрация
      }
    }
  }

  // Проверка за защитени пътища
  for (const route in protectedRoutes) {
    if (pathname.startsWith(route)) {
      const token = request.cookies.get('accessToken')?.value;

      if (!token) {
        return NextResponse.redirect(new URL('/', request.url));
      }

      try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        const allowedRoles = protectedRoutes[route];

        // Ако има изискване за роли и ролята на потребителя не е сред тях
        if (allowedRoles && (!payload.role || !allowedRoles.includes(payload.role as string))) {
          return NextResponse.redirect(new URL('/', request.url));
        }

        // Всичко е ок
        return NextResponse.next();
      } catch (err) {
        return NextResponse.redirect(new URL('/auth/login?error=unauthorized', request.url));
      }
    }
  }

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
