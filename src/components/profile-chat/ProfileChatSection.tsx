"use client";

import {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { useProfileChat } from "@/hooks/useProfileChat";
import styles from "./ProfileChatSection.module.css";

const SUGGESTIONS = [
  "What is your tech stack?",
  "Tell me about ShareCV",
  "Where are you based?",
];

function SendArrowIcon() {
  return (
    <svg
      className={styles.sendIcon}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12h12.5M13 6.5 18.5 12 13 17.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IdentifyModal({
  initialName,
  initialEmail,
  identifying,
  error,
  onClose,
  onSubmit,
}: {
  initialName: string;
  initialEmail: string;
  identifying: boolean;
  error: string | null;
  onClose: () => void;
  onSubmit: (name: string, email: string) => void;
}) {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const titleId = useId();
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape" && !identifying) onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [identifying, onClose]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(name, email);
  };

  return (
    <div className={styles.modalOverlay} role="presentation">
      <button
        type="button"
        className={styles.modalBackdrop}
        aria-label="Close identity form"
        onClick={identifying ? undefined : onClose}
      />
      <div
        className={styles.modalDialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <h3 id={titleId} className={styles.modalTitle}>
          Before we start
        </h3>
        <p className={styles.modalCopy}>
          Enter your name and email so this conversation can be saved and
          restored later.
        </p>
        {error ? <div className={styles.error}>{error}</div> : null}
        <form className={styles.identifyForm} onSubmit={handleSubmit}>
          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label htmlFor="chat-name">Your Name</label>
              <input
                ref={nameRef}
                id="chat-name"
                name="name"
                type="text"
                required
                minLength={1}
                maxLength={100}
                value={name}
                onChange={(event) => setName(event.target.value)}
                className={styles.input}
                disabled={identifying}
                autoComplete="name"
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="chat-email">Email Address</label>
              <input
                id="chat-email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={styles.input}
                disabled={identifying}
                autoComplete="email"
              />
            </div>
          </div>
          <div className={styles.modalActions}>
            <button
              type="button"
              className={styles.resetBtn}
              onClick={onClose}
              disabled={identifying}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={identifying}
            >
              {identifying ? "Connecting…" : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ProfileChatSection() {
  const {
    session,
    messages,
    error,
    identifying,
    sending,
    send,
    identify,
    identifyThenSend,
    resetIdentity,
  } = useProfileChat();

  const [draft, setDraft] = useState("");
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);
  const [showIdentity, setShowIdentity] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const composerRef = useRef<HTMLTextAreaElement>(null);
  const known = Boolean(session?.name && session?.email);
  const busy = sending || identifying;

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    list.scrollTop = list.scrollHeight;
  }, [messages, sending]);

  const openIdentity = (text?: string) => {
    if (showIdentity || identifying) return;
    if (text?.trim()) setPendingMessage(text.trim());
    setShowIdentity(true);
  };

  const requireIdentity = () => {
    if (known) return;
    openIdentity();
  };

  const closeIdentity = () => {
    if (identifying) return;
    if (pendingMessage) setDraft(pendingMessage);
    setPendingMessage(null);
    setShowIdentity(false);
    composerRef.current?.blur();
  };

  const dispatchMessage = (text: string) => {
    if (!text || busy) return;
    if (!known) {
      openIdentity(text);
      return;
    }
    void send(text);
  };

  const handleSend = (event?: FormEvent) => {
    event?.preventDefault();
    const text = draft.trim();
    if (!text || busy) return;
    if (!known) {
      openIdentity(text);
      return;
    }
    setDraft("");
    void send(text);
  };

  const handleComposerKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const handleIdentify = (name: string, email: string) => {
    const text = pendingMessage?.trim() ?? "";
    const finish = (ok: boolean) => {
      if (!ok) return;
      setPendingMessage(null);
      setShowIdentity(false);
      window.setTimeout(() => composerRef.current?.focus(), 0);
    };

    if (text) {
      void identifyThenSend(name, email, text).then(finish);
      return;
    }
    void identify(name, email).then((session) => finish(Boolean(session)));
  };

  return (
    <section id="chat" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Ask My Profile</h2>
          <p className={styles.lede}>
            A RAG assistant trained on this CV — stack, projects, and experience.
          </p>
        </div>

        <div className={styles.panel}>
          <div className={styles.chatHeader}>
            <div className={styles.botAvatarWrap}>
              <Image
                src="/images/Anh.jpeg"
                alt=""
                width={44}
                height={44}
                className={styles.botAvatar}
              />
              <span className={styles.onlineDot} aria-hidden="true" />
            </div>
            <div className={styles.chatHeaderText}>
              <p className={styles.botName}>Stylo</p>
              <p className={styles.botStatus}>
                {identifying && known
                  ? "Restoring chat…"
                  : known
                    ? `Talking with ${session?.name}`
                    : "Online · Profile assistant"}
              </p>
            </div>
            {known ? (
              <button
                type="button"
                className={styles.resetBtn}
                onClick={resetIdentity}
                disabled={busy}
              >
                Switch
              </button>
            ) : null}
          </div>

          {error && !showIdentity ? (
            <div className={styles.error}>{error}</div>
          ) : null}

          <div ref={listRef} className={styles.messages} aria-live="polite">
            {messages.length === 0 && !sending ? (
              <div className={styles.empty}>
                <div className={styles.emptyAvatar}>
                  <Image
                    src="/images/Anh.jpeg"
                    alt=""
                    width={56}
                    height={56}
                    className={styles.botAvatar}
                  />
                </div>
                <p className={styles.emptyTitle}>Hey, ask me anything</p>
                <p className={styles.emptyHint}>Try one of these</p>
                <div className={styles.suggestions}>
                  {SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      className={styles.suggestion}
                      disabled={busy}
                      onClick={() => dispatchMessage(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`${styles.bubbleRow} ${
                  message.role === "user"
                    ? styles.bubbleRowUser
                    : styles.bubbleRowAssistant
                }`}
              >
                {message.role === "assistant" ? (
                  <Image
                    src="/images/Anh.jpeg"
                    alt=""
                    width={32}
                    height={32}
                    className={styles.rowAvatar}
                  />
                ) : null}
                <div
                  className={`${styles.bubble} ${
                    message.role === "user"
                      ? styles.bubbleUser
                      : styles.bubbleAssistant
                  }`}
                >
                  {message.content}
                  {message.sources?.length ? (
                    <div className={styles.sources}>
                      {message.sources.map((source, sourceIndex) => {
                        const label = source.title || source.url || "Source";
                        if (source.url) {
                          return (
                            <a
                              key={`${label}-${sourceIndex}`}
                              href={source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.source}
                            >
                              {label}
                            </a>
                          );
                        }
                        return (
                          <span
                            key={`${label}-${sourceIndex}`}
                            className={styles.source}
                          >
                            {label}
                          </span>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
                {message.role === "user" ? (
                  <span className={styles.userAvatar} aria-hidden="true">
                    {(session?.name ?? "Y").slice(0, 1).toUpperCase()}
                  </span>
                ) : null}
              </div>
            ))}

            {sending ? (
              <div
                className={`${styles.bubbleRow} ${styles.bubbleRowAssistant}`}
              >
                <Image
                  src="/images/Anh.jpeg"
                  alt=""
                  width={32}
                  height={32}
                  className={styles.rowAvatar}
                />
                <div className={`${styles.bubble} ${styles.bubbleAssistant}`}>
                  <span className={styles.typing} aria-label="Thinking">
                    <i />
                    <i />
                    <i />
                  </span>
                </div>
              </div>
            ) : null}
          </div>

          <form className={styles.composer} onSubmit={handleSend}>
            <textarea
              ref={composerRef}
              className={styles.composerInput}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={handleComposerKeyDown}
              onFocus={requireIdentity}
              onPointerDown={requireIdentity}
              maxLength={4000}
              required
              minLength={1}
              placeholder="Ask about my work…"
              disabled={sending || identifying}
              rows={1}
            />
            <button
              type="submit"
              className={styles.sendBtn}
              disabled={busy || !draft.trim()}
              aria-label={sending ? "Sending" : "Send message"}
            >
              {sending ? <span className={styles.sendSpinner} /> : <SendArrowIcon />}
            </button>
          </form>
        </div>
      </div>

      {showIdentity ? (
        <IdentifyModal
          initialName={session?.name ?? ""}
          initialEmail={session?.email ?? ""}
          identifying={identifying}
          error={error}
          onClose={closeIdentity}
          onSubmit={handleIdentify}
        />
      ) : null}
    </section>
  );
}
