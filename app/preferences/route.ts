import { NextRequest, NextResponse } from "next/server";
import { isStateCode } from "@/lib/capability";

export function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const state = searchParams.get("state");
  const language = searchParams.get("language");
  const referer = request.headers.get("referer");
  const redirectTo = referer && referer.startsWith(request.nextUrl.origin) ? referer : request.nextUrl.origin;
  const response = NextResponse.redirect(redirectTo);

  if (isStateCode(state)) {
    response.cookies.set("raah_state", state, { path: "/", sameSite: "lax", maxAge: 60 * 60 * 24 * 365 });
  }

  if (language === "en" || language === "hi") {
    response.cookies.set("raah_language", language, { path: "/", sameSite: "lax", maxAge: 60 * 60 * 24 * 365 });
  }

  return response;
}
