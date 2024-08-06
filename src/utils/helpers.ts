export function isValidBase64(str: string) {
  const base64Pattern = /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/;
  if (!base64Pattern.test(str)) return false;
  return true;
}
