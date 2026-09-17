"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { getHistory, identifyVisitor, sendChat } from "@/lib/ragchat/client";
import { RagchatError } from "@/lib/ragchat/types";
import {
  clearSession,
  getServerSessionSnapshot,
  getSessionSnapshot,
  saveSession,
  subscribeSession,
} from "@/lib/ragchat/session";
import {
  normalizeMessages,
  normalizeSources,
  type ChatMessage,
  type StoredSession,
} from "@/lib/ragchat/types";

function errorMessage(error: unknown) {
  if (error instanceof Error && error.message) return error.message;
  return "Something went wrong. Please try again.";
}

async function messagesForVisitor(
  visitorId: string,
  rawMessages: unknown,
): Promise<ChatMessage[]> {
  const fromIdentify = normalizeMessages(rawMessages);
  if (fromIdentify.length) return fromIdentify;

  try {
    const history = await getHistory(visitorId, true);
    return normalizeMessages(history.messages);
  } catch {
    return [];
  }
}

export function useProfileChat() {
  const session = useSyncExternalStore(
    subscribeSession,
    getSessionSnapshot,
    getServerSessionSnapshot,
  );
  const restoredFor = useRef<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [identifying, setIdentifying] = useState(false);
  const [sending, setSending] = useState(false);

  const restore = useCallback(async (stored: StoredSession) => {
    restoredFor.current = `${stored.name}|${stored.email}`;
    setIdentifying(true);
    setError(null);
    try {
      const response = await identifyVisitor(stored.name, stored.email);
      const next: StoredSession = {
        visitorId: response.visitor_id,
        name: stored.name,
        email: stored.email,
      };
      saveSession(next);
      setMessages(await messagesForVisitor(next.visitorId, response.messages));
    } catch (caught) {
      restoredFor.current = null;
      setError(errorMessage(caught));
    } finally {
      setIdentifying(false);
    }
  }, []);

  useEffect(() => {
    if (!session?.name || !session?.email) return;
    const key = `${session.name}|${session.email}`;
    if (restoredFor.current === key) return;

    const timer = window.setTimeout(() => {
      void restore(session);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [restore, session]);

  const sendWithSession = useCallback(
    async (stored: StoredSession, text: string) => {
      const message = text.trim();
      if (!message) return false;

      const userMessage: ChatMessage = { role: "user", content: message };
      setMessages((current) => [...current, userMessage]);
      setSending(true);
      setError(null);

      const chatOnce = (visitorId: string) => sendChat(visitorId, message);

      try {
        let response;
        try {
          response = await chatOnce(stored.visitorId);
        } catch (caught) {
          if (!(caught instanceof RagchatError) || caught.status !== 404) {
            throw caught;
          }
          const identified = await identifyVisitor(stored.name, stored.email);
          const next: StoredSession = {
            ...stored,
            visitorId: identified.visitor_id,
          };
          saveSession(next);
          response = await chatOnce(next.visitorId);
        }

        const sources = normalizeSources(response.sources);
        setMessages((current) => [
          ...current,
          {
            role: "assistant",
            content: response.chat_response,
            sources: sources.length ? sources : undefined,
          },
        ]);
        return true;
      } catch (caught) {
        setMessages((current) => current.filter((item) => item !== userMessage));
        setError(errorMessage(caught));
        return false;
      } finally {
        setSending(false);
      }
    },
    [],
  );

  const send = useCallback(
    async (text: string) => {
      if (!session) return false;
      return sendWithSession(session, text);
    },
    [sendWithSession, session],
  );

  const identify = useCallback(async (name: string, email: string) => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName || !trimmedEmail) return null;

    setIdentifying(true);
    setError(null);
    try {
      const response = await identifyVisitor(trimmedName, trimmedEmail);
      const next: StoredSession = {
        visitorId: response.visitor_id,
        name: trimmedName,
        email: trimmedEmail,
      };
      restoredFor.current = `${next.name}|${next.email}`;
      saveSession(next);
      setMessages(await messagesForVisitor(next.visitorId, response.messages));
      return next;
    } catch (caught) {
      setError(errorMessage(caught));
      return null;
    } finally {
      setIdentifying(false);
    }
  }, []);

  const identifyThenSend = useCallback(
    async (name: string, email: string, text: string) => {
      const next = await identify(name, email);
      if (!next) return false;
      const message = text.trim();
      if (!message) return true;
      return sendWithSession(next, message);
    },
    [identify, sendWithSession],
  );

  const resetIdentity = useCallback(() => {
    restoredFor.current = null;
    clearSession();
    setMessages([]);
    setError(null);
  }, []);

  return {
    session,
    messages,
    error,
    identifying,
    sending,
    send,
    identify,
    identifyThenSend,
    resetIdentity,
  };
}
