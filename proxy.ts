import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth/token";

const LOGIN_PATH = "/xfa/admin/login";

// Optimistic check only. Admin pages, data functions and server actions
// each call requireAdmin() as well, so this is not the only line of defence.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoggedIn = verifySessionToken(
    request.cookies.get(SESSION_COOKIE)?.value
  );

  if (pathname === LOGIN_PATH) {
    return isLoggedIn
      ? NextResponse.redirect(new URL("/xfa/admin/packages", request.url))
      : NextResponse.next();
  }

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/xfa/admin/:path*"],
};
