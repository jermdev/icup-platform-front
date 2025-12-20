import { defineMiddleware } from 'astro:middleware';

const protectedRoutes = ['/dashboard', '/profile', '/my-events'];
const publicRoutes = [
  '/',
  '/about',
  '/contact',
  '/calendar',
  '/events',
  '/sermons',
  '/login',
  '/register',
];

// export const onRequest = defineMiddleware(async (context, next) => {
//   const { pathname } = context.url;

//   // Check if route is protected
//   const isProtected = protectedRoutes.some((route) =>
//     pathname.startsWith(route)
//   );

//   if (isProtected) {
//     // Get access token from cookies (matches backend cookie name: access_token)
//     const token = context.cookies.get('access_token');

//     // Debug logging
//     console.log('🔍 Middleware Debug:', {
//       path: pathname,
//       hasToken: !!token,
//       tokenValue: token?.value
//         ? `${token.value.substring(0, 20)}...`
//         : 'undefined',
//     });

//     if (!token) {
//       console.log('❌ No access token found, redirecting to login');
//       return context.redirect('/login');
//     }

//     try {
//       // Verify token by calling backend
//       // The JWT strategy will extract the token from the access_token cookie
//       const apiUrl =
//         import.meta.env.PUBLIC_API_URL || 'http://localhost:3000/api';

//       console.log('🔄 Verifying token with backend:', apiUrl);

//       const response = await fetch(`${apiUrl}/auth/me`, {
//         credentials: 'include',
//         headers: {
//           Cookie: `access_token=${token.value}`,
//         },
//       });

//       console.log('📡 Backend response status:', response.status);

//       if (!response.ok) {
//         console.log('❌ Token verification failed, redirecting to login');
//         return context.redirect('/login');
//       }

//       const user = await response.json();
//       console.log('✅ User authenticated:', user.email);
//       context.locals.user = user;
//     } catch (error) {
//       console.error('💥 Auth error:', error);
//       return context.redirect('/login');
//     }
//   }

//   return next();
// });

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Get token if exists
  const token = context.cookies.get('access_token');

  // Step 1: Si hay token → intentar validar SIEMPRE
  if (token) {
    try {
      const apiUrl =
        import.meta.env.PUBLIC_API_URL || 'http://localhost:3000/api';

      const response = await fetch(`${apiUrl}/auth/me`, {
        credentials: 'include',
        headers: {
          Cookie: `access_token=${token.value}`,
        },
      });

      if (response.ok) {
        context.locals.user = await response.json();
      } else {
        context.locals.user = undefined;
      }
    } catch (err) {
      console.error('Token verification error:', err);
      context.locals.user = undefined;
    }
  } else {
    context.locals.user = undefined;
  }

  // Step 2: Si ruta es protegida y NO hay user → redirigir
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !context.locals.user) {
    return context.redirect('/login');
  }

  return next();
});
