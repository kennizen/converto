import { js_beautify } from "js-beautify";

export function format(str: string) {
  return js_beautify(str, {
    indent_size: 2,
  });
}
