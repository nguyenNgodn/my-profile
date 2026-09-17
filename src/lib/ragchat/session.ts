import type { StoredSession } from "./types";

export const SESSION_STORAGE_KEY = "stylo-cv.ragchat.session";
export const SESSION_CHANGE_EVENT = "stylo-cv.ragchat.session-changed";

let cachedRaw: string | null | undefined;
let cachedSession: StoredSession | null = null;

function canUseStorage() {
  return typeof window !== "undefined";
}

function parseSession(raw: string | null): StoredSession | null {
  if (!raw) return null;

  try {
    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      !("visitorId" in parsed) ||
      !("name" in parsed) ||
      !("email" in parsed)
    ) {
      return null;
    }

    const session = parsed as StoredSession;
    if (!session.name.trim() || !session.email.trim()) return null;
    return session;
  } catch {
    return null;
  }
}

function notify() {
  if (!canUseStorage()) return;
  window.dispatchEvent(new Event(SESSION_CHANGE_EVENT));
}

export function getSessionSnapshot(): StoredSession | null {
  if (!canUseStorage()) return null;
  const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);
  if (raw === cachedRaw) return cachedSession;
  cachedRaw = raw;
  cachedSession = parseSession(raw);
  return cachedSession;
}

export function getServerSessionSnapshot(): StoredSession | null {
  return null;
}

export function subscribeSession(onStoreChange: () => void) {
  window.addEventListener(SESSION_CHANGE_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(SESSION_CHANGE_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

export function saveSession(session: StoredSession) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  cachedRaw = undefined;
  notify();
}

export function clearSession() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(SESSION_STORAGE_KEY);
  cachedRaw = undefined;
  notify();
}
