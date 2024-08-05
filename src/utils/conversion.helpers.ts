import { SupportedConversions } from "@/constants/SupportedConversions";
import { intoResult, Result } from "@/hof/results";
import { jsonthrow } from "jsonthrow";

export async function getConvertedOrParsedData(input: string, type: SupportedConversions) {
  switch (type) {
    case "json to base64":
      return await jsonToBase64(input);
    case "base64 to json":
      return await base64ToJson(input);
    default:
      break;
  }
}

export async function jsonToBase64(json: string) {
  const [res, err] = jsonthrow.parse<any>(json);

  if (err) {
    console.error("Error parsing json in json to base64", err);
    return;
  }

  return btoa(json);
}

export async function base64ToJson(base64: string) {
  const base64Pattern = /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/;

  if (!base64Pattern.test(base64)) {
    console.error("Invalid base64 string");
    return;
  }

  const [res, err] = intoResult(atob, base64);

  if (err) {
    console.error("Error parsing base64 string");
    return;
  }

  return res;
}
