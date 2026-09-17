import {
  RagchatError,
  type ChatResponse,
  type HistoryResponse,
  type VisitorIdentifyResponse,
} from "./types";

export const RAGCHAT_BASE_URL =
  process.env.NEXT_PUBLIC_RAGCHAT_BASE_URL ?? " https://9c1f-2405-4802-a189-ef50-486c-e8da-2fb5-f3a8.ngrok-free.app" ;

function detailMessage(detail: unknown): string | null {
  if (typeof detail === "string" && detail.trim()) return detail;
  if (Array.isArray(detail)) {
    const parts = detail.map((item) => {
      if (typeof item === "string") return item;
      if (typeof item === "object" && item !== null && "msg" in item) {
        return String((item as { msg: unknown }).msg);
      }
      return JSON.stringify(item);
    });
    const joined = parts.filter(Boolean).join("; ");
    return joined || null;
  }
  return null;
}

async function parseError(response: Response): Promise<never> {
  let message = `Request failed (${response.status})`;
  try {
    const body: unknown = await response.json();
    if (typeof body === "object" && body !== null && "detail" in body) {
      message = detailMessage((body as { detail: unknown }).detail) ?? message;
    }
  } catch {
    // Keep the status fallback when the body is not JSON.
  }
  throw new RagchatError(message, response.status);
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${RAGCHAT_BASE_URL}${path}`, {
      ...init,
      headers: {
        Accept: "application/json",
        ...(init?.body ? { "Content-Type": "application/json" } : {}),
        ...init?.headers,
      },
    });
  } catch {
    throw new RagchatError(
      `Cannot reach chat server at ${RAGCHAT_BASE_URL}. Is it running?`,
      0,
    );
  }

  if (!response.ok) {
    await parseError(response);
  }

  return (await response.json()) as T;
}

export function identifyVisitor(name: string, email: string) {
  return request<VisitorIdentifyResponse>("/ragchat/visitor", {
    method: "POST",
    body: JSON.stringify({ name, email }),
  });
}

export function sendChat(visitorId: string, message: string) {
  return request<ChatResponse>("/ragchat/chat", {
    method: "POST",
    body: JSON.stringify({ visitor_id: visitorId, message }),
  });
}

export function getHistory(visitorId: string, includeWelcome = false) {
  const params = new URLSearchParams({
    visitor_id: visitorId,
    include_welcome: String(includeWelcome),
  });
  return request<HistoryResponse>(`/ragchat/history?${params.toString()}`);
}
