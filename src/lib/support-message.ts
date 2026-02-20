const MAX_SUPPORT_MESSAGE_LENGTH = 280;
const CONTROL_CHARS = /[\u0000-\u001F\u007F]/g;
const URL_PATTERN = /(https?:\/\/\S+|www\.\S+)/gi;
const BLOCKED_WORDS = [/fuck/gi, /shit/gi, /bitch/gi, /cunt/gi];

export function sanitizeSupportMessage(rawValue: unknown): string {
  if (typeof rawValue !== "string") {
    return "";
  }

  let cleaned = rawValue
    .replace(CONTROL_CHARS, " ")
    .replace(URL_PATTERN, "[link removed]")
    .replace(/\s+/g, " ")
    .trim();

  for (const pattern of BLOCKED_WORDS) {
    cleaned = cleaned.replace(pattern, "***");
  }

  return cleaned.slice(0, MAX_SUPPORT_MESSAGE_LENGTH);
}

export function sanitizeDonorName(rawValue: unknown): string {
  if (typeof rawValue !== "string") {
    return "Anonymous";
  }

  const cleaned = rawValue
    .replace(CONTROL_CHARS, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);

  return cleaned.length > 0 ? cleaned : "Anonymous";
}
