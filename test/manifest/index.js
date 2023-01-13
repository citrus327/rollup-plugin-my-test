import foo from "@test/manifest/foo";
import { b, c } from "@test/manifest/bar";

export { b, c };
export function main() {
  console.log(foo);
}
