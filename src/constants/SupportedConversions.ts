export type SupportedConversions =
  | "base64 to json"
  | "json to base64"
  | "jsObject to base64"
  | "base64 to jsObject"
  | "blob to base64"
  | "base64 to blob";

export const supportedConversions: SupportedConversions[] = [
  "base64 to json",
  "json to base64",
  "base64 to jsObject",
  "jsObject to base64",
  "blob to base64",
  "base64 to blob",
] as const;
