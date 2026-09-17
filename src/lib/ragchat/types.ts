export type ChatRole = "user" | "assistant";

export type ChatSource = {
  title?: string;
  url?: string;
  snippet?: string;
};

export type ChatMessage = {
  role: ChatRole;
  content: string;
  sources?: ChatSource[];
};

export type StoredSession = {
  visitorId: string;
  name: string;
  email: string;
};

export type VisitorIdentifyResponse = {
  visitor_id: string;
  is_new: boolean;
  messages?: unknown;
};

export type ChatResponse = {
  chat_response: string;
  sources?: unknown;
};

export type HistoryResponse = {
  messages?: unknown;
};

export class RagchatError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "RagchatError";
    this.status = status;
  }
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return null;
}

function mapRole(value: unknown): ChatRole {
  const role = String(value ?? "").toLowerCase();
  if (["user", "human", "visitor"].includes(role)) return "user";
  return "assistant";
}

function readContent(record: Record<string, unknown>): string {
  const keys = ["content", "message", "text", "chat_response"] as const;
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) return value;
  }
  return "";
}

export function normalizeSources(raw: unknown): ChatSource[] {
  if (!Array.isArray(raw)) return [];

  const sources: ChatSource[] = [];
  for (const item of raw) {
    if (typeof item === "string" && item.trim()) {
      sources.push({ title: item });
      continue;
    }

    const record = asRecord(item);
    if (!record) continue;

    const title =
      (typeof record.title === "string" && record.title) ||
      (typeof record.source === "string" && record.source) ||
      (typeof record.filename === "string" && record.filename) ||
      undefined;
    const url = typeof record.url === "string" ? record.url : undefined;
    const snippet =
      (typeof record.snippet === "string" && record.snippet) ||
      (typeof record.content === "string" && record.content) ||
      undefined;

    if (!title && !url && !snippet) continue;
    sources.push({ title, url, snippet });
  }
  return sources;
}

export function normalizeMessage(raw: unknown): ChatMessage | null {
  if (typeof raw === "string" && raw.trim()) {
    return { role: "assistant", content: raw };
  }

  const record = asRecord(raw);
  if (!record) return null;

  const content = readContent(record);
  if (!content) return null;

  const sources = normalizeSources(record.sources);
  return {
    role: mapRole(record.role ?? record.sender),
    content,
    sources: sources.length ? sources : undefined,
  };
}

export function normalizeMessages(raw: unknown): ChatMessage[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map(normalizeMessage)
    .filter((message): message is ChatMessage => message !== null);
}
