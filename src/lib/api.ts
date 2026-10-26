import { apiRoot } from "./apiBase";
import { trackWaitlistSignup } from "./analytics";

// The backend address. Vite only exposes env vars that start with VITE_.
const API_URL = apiRoot();

/** Sent with every form so the server can tell a person from an automatic program. */
export type BotPayload = {
  website: string;
  form_started: number;
};

export type InquiryPayload = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  country?: string;
  needs: string[];
  timeline?: string;
  budget_range?: string;
  /** GHS or USD. Saved with the brief so the range is not just a number. */
  budget_currency?: "GHS" | "USD";
  brief_link?: string;
  message: string;
  /** Must be true. The server stores the time the visitor agreed. */
  consent: boolean;
};

export type WaitlistPayload = {
  email: string;
  name?: string;
  consent: boolean;
};

export type WaitlistResult = {
  alreadyOnList: boolean;
};

export type AcademyPayload = {
  name: string;
  email: string;
  message?: string;
  consent: boolean;
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

export function postInquiry(payload: InquiryPayload & BotPayload) {
  return postJson("/inquiries/", payload).then(() => undefined);
}

export type NewsletterPayload = {
  email: string;
  consent: boolean;
} & BotPayload;

export type NewsletterResult = {
  alreadySubscribed: boolean;
};

export async function postNewsletter(payload: NewsletterPayload): Promise<NewsletterResult> {
  const data = await postJson("/newsletter/", payload);
  trackWaitlistSignup("newsletter");
  return {
    alreadySubscribed: Boolean(data && data.already_subscribed),
  };
}

export async function postWaitlist(payload: WaitlistPayload & BotPayload): Promise<WaitlistResult> {
  const data = await postJson("/waitlist/", payload);
  return {
    alreadyOnList: Boolean(data && data.already_on_list),
  };
}

export function postAcademyInterest(payload: AcademyPayload & BotPayload) {
  return postJson("/academy-interest/", payload).then(() => undefined);
}
