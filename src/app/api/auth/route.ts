import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createSessionToken, SESSION_COOKIE_NAME, SESSION_MAX_AGE_SECONDS } from "@/lib/auth/session";

function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const correctPassword = process.env.ADMIN_SECRET_KEY;

    if (!correctPassword) {
      return NextResponse.json(
        { success: false, error: "Admin authentication is not configured. Set ADMIN_SECRET_KEY." },
        { status: 500 }
      );
    }

    if (typeof password === "string" && safeCompare(password, correctPassword)) {
      const response = NextResponse.json({ success: true, message: "Authenticated successfully" });
      response.cookies.set(SESSION_COOKIE_NAME, await createSessionToken(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: SESSION_MAX_AGE_SECONDS,
        path: "/",
      });
      return response;
    }

    return NextResponse.json({ success: false, error: "Invalid admin passphrase" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Authentication failed" }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: "Logged out" });
  response.cookies.delete(SESSION_COOKIE_NAME);
  return response;
}
