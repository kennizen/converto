export type SupportedConversions =
  | "base64 to json"
  | "json to base64"
  | "jsObject to base64"
  | "base64 to jsObject"
  | string;

export const supportedConversions: SupportedConversions[] = [
  "base64 to json",
  "json to base64",
  "base64 to jsObject",
  "jsObject to base64",
] as const;
