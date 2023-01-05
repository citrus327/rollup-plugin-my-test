import foo from "./foo.js";
import { a } from "a-treeshakable-pkg";

export function test() {
  console.log(foo);
}

export { a };
