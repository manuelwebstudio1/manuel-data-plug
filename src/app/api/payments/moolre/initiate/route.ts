import { NextResponse } from "next/server";
import { z } from "zod";
import {
  initiateMoolrePayment,
  isMoolrePaymentMethod,
  isMoolreSuccess,
} from "@/lib/payments/moolre";
import { generateOrderId } from "@/lib/utils";

const schema = z.object({
  amount: z.number().positive(),
  /** MoMo wallet number that will pay (payer) */
  phone: z.string().min(9),
  /** Optional: number that receives the data bundle */
  recipientPhone: z.string().min(9).optional(),
  method: z.enum(["mtn_momo", "telecel_cash", "at_money"]),
  packageName: z.string().optional(),
  otpCode: z.string().optional(),
  externalRef: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid payment request", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const {
      amount,
      phone,
      recipientPhone,
      method,
      packageName,
      otpCode,
      externalRef,
    } = parsed.data;

    if (!isMoolrePaymentMethod(method)) {
      return NextResponse.json(
        { error: "Unsupported payment method" },
        { status: 400 }
      );
    }

    const reference = externalRef || generateOrderId();
    const noteParts = [
      packageName,
      recipientPhone ? `to ${recipientPhone}` : null,
      reference,
    ].filter(Boolean);

    const result = await initiateMoolrePayment({
      amount,
      phone,
      method,
      externalRef: reference,
      reference: noteParts.join(" · "),
      otpCode,
    });

    if (!isMoolreSuccess(result)) {
      return NextResponse.json(
        {
          error: result.message || "Payment could not be started",
          code: result.code,
          data: result.data,
          reference,
        },
        { status: 400 }
      );
    }

    const needsOtp = result.code === "TP14";

    return NextResponse.json({
      ok: true,
      needsOtp,
      reference,
      transactionId: result.data,
      code: result.code,
      message:
        result.message ||
        (needsOtp
          ? "Complete the SMS verification, then try again with the OTP."
          : "Approve the MoMo prompt on your phone to complete payment."),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Payment initiation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
