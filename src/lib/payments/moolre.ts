export type MoolreChannel = "13" | "6" | "7";

export type MoolrePaymentMethod = "mtn_momo" | "telecel_cash" | "at_money";

const CHANNEL_MAP: Record<MoolrePaymentMethod, MoolreChannel> = {
  mtn_momo: "13",
  telecel_cash: "6",
  at_money: "7",
};

export function isMoolrePaymentMethod(
  method: string
): method is MoolrePaymentMethod {
  return method in CHANNEL_MAP;
}

export function moolreChannelFor(method: MoolrePaymentMethod): MoolreChannel {
  return CHANNEL_MAP[method];
}

/** Normalize Ghana numbers to local 0-prefixed format for Moolre. */
export function normalizeGhanaPhone(input: string) {
  const digits = input.replace(/\D/g, "");
  if (digits.startsWith("233") && digits.length >= 12) {
    return `0${digits.slice(3)}`;
  }
  if (digits.startsWith("0") && digits.length >= 10) {
    return digits.slice(0, 10);
  }
  if (digits.length === 9) {
    return `0${digits}`;
  }
  return digits;
}

function getMoolreConfig() {
  const mode = (process.env.MOOLRE_MODE || "live").toLowerCase();
  const username = process.env.MOOLRE_USERNAME?.trim();
  const accountNumber = process.env.MOOLRE_ACCOUNT_NUMBER?.trim();
  const privateKey =
    process.env.MOOLRE_PRIVATE_API_KEY?.trim() ||
    process.env.MOOLRE_SECRET_KEY?.trim();
  const publicKey = process.env.MOOLRE_PUBLIC_API_KEY?.trim();

  if (!username || !accountNumber || !privateKey) {
    throw new Error(
      "Moolre is not configured. Set MOOLRE_USERNAME, MOOLRE_ACCOUNT_NUMBER, and MOOLRE_SECRET_KEY."
    );
  }

  const baseUrl =
    mode === "sandbox" || mode === "test"
      ? "https://sandbox.moolre.com"
      : "https://api.moolre.com";

  return { username, accountNumber, privateKey, publicKey, baseUrl, mode };
}

export type InitiateMoolrePaymentInput = {
  amount: number;
  phone: string;
  method: MoolrePaymentMethod;
  externalRef: string;
  reference?: string;
  otpCode?: string;
};

export type MoolreApiResponse = {
  status: number | string;
  code?: string;
  message?: string | null;
  data?: unknown;
  go?: unknown;
};

export async function initiateMoolrePayment(
  input: InitiateMoolrePaymentInput
): Promise<MoolreApiResponse> {
  const { username, accountNumber, privateKey, publicKey, baseUrl, mode } =
    getMoolreConfig();

  const payer = normalizeGhanaPhone(input.phone);
  if (payer.length < 10) {
    throw new Error("Enter a valid Ghana phone number");
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-API-USER": username,
    "X-API-KEY": privateKey,
  };

  // Optional — only send if provided
  if (publicKey) {
    headers["X-API-PUBKEY"] = publicKey;
  }

  const body: Record<string, unknown> = {
    type: 1,
    channel: moolreChannelFor(input.method),
    currency: "GHS",
    payer,
    amount: String(input.amount),
    externalref: input.externalRef,
    accountnumber: accountNumber,
    reference: input.reference || input.externalRef,
  };

  if (input.otpCode) {
    body.otpcode = input.otpCode;
  }

  if (mode === "sandbox" || mode === "test") {
    body.skipotp = true;
  }

  const res = await fetch(`${baseUrl}/open/transact/payment`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const json = (await res.json().catch(() => null)) as MoolreApiResponse | null;

  if (!json) {
    throw new Error(`Moolre request failed (${res.status})`);
  }

  return json;
}

export function isMoolreSuccess(response: MoolreApiResponse) {
  return String(response.status) === "1";
}
