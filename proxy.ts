import { withAuth } from "next-auth/middleware";
import { AUTHENTICATION_ROUTES, PRIVATE_ROUTES } from "./constants/auth";

export default withAuth(
  async function middleware(req, next) {
    const newUrl = new URL("/", req.nextUrl.origin);

    const isProtectedRoute = PRIVATE_ROUTES.some(
      (r) => r == req.nextUrl.pathname
    );

    if (
      AUTHENTICATION_ROUTES.includes(req.nextUrl.pathname) &&
      req.nextauth.token
    )
      return Response.redirect(newUrl);
    if (!req.nextauth.token && isProtectedRoute) {
      const url = req.nextUrl.clone();
      url.pathname = AUTHENTICATION_ROUTES[0];

      return Response.redirect(url);
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return true;
      },
    },
  }
);
export const config = {
  matcher: [
    /*
      Matches all request paths except:
      1. Next.js internal paths (_next)
      2. Static files/folders (static, favicon.ico, etc.)
      3. Paths containing a file extension (e.g., .jpg, .css)
    */
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
