import { NextRequest, NextResponse } from "next/server";
import { createApplication, seededLedger, verifiedReference } from "@/lib/mock-data";
import { isStateCode } from "@/lib/capability";

export function GET(request: NextRequest) {
  const ref = request.nextUrl.searchParams.get("ref");
  if (ref) {
    const item = verifiedReference(ref);
    return NextResponse.json(item ? { verified: true, item } : { verified: false, message: "This reference does not resolve inside Raah." }, { status: item ? 200 : 404 });
  }
  return NextResponse.json({ items: seededLedger, synthetic: true });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  if (!isStateCode(body.state) || typeof body.serviceId !== "string") return NextResponse.json({ error: "A valid synthetic service and state are required." }, { status: 400 });
  return NextResponse.json({ application: createApplication(body.serviceId, body.state) }, { status: 201 });
}
