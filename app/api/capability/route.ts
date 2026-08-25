import { NextRequest, NextResponse } from "next/server";
import { capabilityRows, getCapability, isStateCode } from "@/lib/capability";

export function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const service = searchParams.get("service");
  const state = searchParams.get("state");

  if (service && isStateCode(state)) {
    const row = getCapability(service, state);
    return row ? NextResponse.json(row) : NextResponse.json({ error: "Capability row not found" }, { status: 404 });
  }

  return NextResponse.json({ rows: capabilityRows });
}
