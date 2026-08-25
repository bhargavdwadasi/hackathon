import { NextRequest, NextResponse } from "next/server";
import { isStateCode, services } from "@/lib/capability";

export function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const service = searchParams.get("service");
  const state = searchParams.get("state");
  const fallback = services[0]?.id ?? "challan";
  const serviceId = services.some((item) => item.id === service) ? service : fallback;
  const stateCode = isStateCode(state) ? state : "KA";

  return NextResponse.redirect(new URL(`/check/${serviceId}/${stateCode}`, request.url));
}
