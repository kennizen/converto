import { SupportedConversions } from "@/constants/SupportedConversions";
import { intoResult, Result } from "@/hof/results";
import { jsonthrow } from "jsonthrow";
import { isValidBase64 } from "./helpers";

export async function getConvertedOrParsedData(input: string, type: SupportedConversions) {
  switch (type) {
    case "json to base64":
      return await jsonToBase64(input);
    case "base64 to json":
      return await base64ToJson(input);
    case "jsObject to base64":
      return await jsObjectToBase64(input);
    case "base64 to jsObject":
      return base64ToJsObject(input);
    default:
      break;
  }
}

async function jsonToBase64(json: string) {
  const [_, err] = jsonthrow.parse<any>(json);

  if (err) {
    console.error("Error parsing json in json to base64", err);
    return;
  }

  return btoa(json);
}

async function base64ToJson(base64: string) {
  if (!isValidBase64(base64)) {
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

async function jsObjectToBase64(obj: string) {
  const [_, err] = intoResult(eval, "(" + obj + ")");

  if (err) {
    console.error("Not a valid JS object.");
    return;
  }

  return btoa(obj);
}

async function base64ToJsObject(base64: string) {
  if (!isValidBase64(base64)) {
    console.error("Invalid base64 string");
    return;
  }

  const [res, err] = intoResult(atob, base64);

  if (err) {
    console.error("Failed to decode base64 from JS object.");
    return;
  }

  return res;
}
