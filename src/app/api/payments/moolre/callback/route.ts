import { NextResponse } from "next/server";

/**
 * Moolre payment callback endpoint.
 * Logs payload for now; wire to order status updates when orders are persisted.
 */
export async function POST(request: Request) {
  try {
    const payload = await request.json().catch(() => null);
    console.info("[moolre:callback]", JSON.stringify(payload));
    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json({ received: false }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, service: "moolre-callback" });
}
