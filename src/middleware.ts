import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/auth/session";

const PROTECTED_API_PREFIXES = ["/api/settings", "/api/projects", "/api/pages", "/api/media"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  const authenticated = await verifySessionToken(session);

  // Protect the admin console (everything except the login page itself)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!authenticated) {
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // Protect CMS-mutating API routes: GET reads may stay public (used by admin UI
  // and public pages), but any state-changing method requires a valid session.
  const isProtectedApi = PROTECTED_API_PREFIXES.some((p) => pathname.startsWith(p));
  if (isProtectedApi && req.method !== "GET" && req.method !== "HEAD" && req.method !== "OPTIONS") {
    if (!authenticated) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/settings/:path*", "/api/projects/:path*", "/api/pages/:path*", "/api/media/:path*"],
};
