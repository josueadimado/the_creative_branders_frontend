import { apiRoot } from "../lib/apiBase";

/** The sign-in key for this browser tab. Closing the tab signs you out. */
const TOKEN_KEY = "tcb-desk-token";

export function readToken(): string {
  return sessionStorage.getItem(TOKEN_KEY) || "";
}

export function saveToken(token: string) {
  sessionStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  sessionStorage.removeItem(TOKEN_KEY);
}

/** The server refused the token, so the desk should show the sign-in page. */
export class DeskSignedOut extends Error {
  constructor() {
    super("Please sign in again.");
  }
}

function messageFrom(data: unknown): string {
  if (!data || typeof data !== "object") return "Something went wrong. Please try again.";
  const record = data as Record<string, unknown>;
  if (typeof record.detail === "string") return record.detail;
  const first = Object.values(record).find((value) => Array.isArray(value) && typeof value[0] === "string");
  if (Array.isArray(first) && typeof first[0] === "string") return first[0];
  return "Something went wrong. Please try again.";
}

/** Talk to the studio desk. Sends the sign-in token with every request. */
export async function deskFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const headers = new Headers(options.headers);
  const token = readToken();
  if (token) headers.set("Authorization", `Token ${token}`);
  // A file upload sets its own header. Forcing JSON here would break the picture.
  if (options.body && !(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  const response = await fetch(`${apiRoot()}/desk${path}`, { ...options, headers });
  if (response.status === 401) {
    clearToken();
    throw new DeskSignedOut();
  }
  return response;
}

export async function deskJson<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await deskFetch(path, options);
  if (response.status === 204) return undefined as T;
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(messageFrom(data));
  return data as T;
}

export function when(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}
