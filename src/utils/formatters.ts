import { jsonthrow } from "jsonthrow";

export function formatJSON(str: string) {
  const [obj, err1] = jsonthrow.parse<any>(str);

  if (err1) {
    console.error("Error parsing JSON");
    return "";
  }

  return jsonthrow.stringify(obj, null, 2)[0]!;
}
