// The backend address. Vite only exposes env vars that start with VITE_.
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000/api";

export type InquiryPayload = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  country: string;
  budget_range: string;
  message: string;
};

export type WaitlistPayload = {
  email: string;
  name?: string;
};

export type WaitlistResult = {
  alreadyOnList: boolean;
};

export type AcademyPayload = {
  name: string;
  email: string;
  message?: string;
};

type ApiErrorBody = {
  detail?: string;
  already_on_list?: boolean;
  [key: string]: unknown;
};

async function postJson(path: string, body: unknown): Promise<ApiErrorBody | void> {
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    let message = "Something went wrong. Please try again.";
    try {
      const data = (await response.json()) as ApiErrorBody;
      if (typeof data.detail === "string") {
        message = data.detail;
      } else {
        const first = Object.values(data).find((value) => Array.isArray(value) && value[0]);
        if (Array.isArray(first) && typeof first[0] === "string") {
          message = first[0];
        }
      }
    } catch {
      // Response was not JSON — keep the generic message.
    }
    throw new Error(message);
  }

  // Some endpoints (waitlist duplicate) return a small JSON body on success.
  const text = await response.text();
  if (!text) return;
  try {
    return JSON.parse(text) as ApiErrorBody;
  } catch {
    return;
  }
}

export function postInquiry(payload: InquiryPayload) {
  return postJson("/inquiries/", payload).then(() => undefined);
}

export async function postWaitlist(payload: WaitlistPayload): Promise<WaitlistResult> {
  const data = await postJson("/waitlist/", payload);
  return {
    alreadyOnList: Boolean(data && data.already_on_list),
  };
}

export function postAcademyInterest(payload: AcademyPayload) {
  return postJson("/academy-interest/", payload).then(() => undefined);
}
