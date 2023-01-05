import type { Plugin } from "rollup";

function myDopePlugin(): Plugin {
  return {
    name: "my-dope-plugin",
    buildEnd() {
      console.log("build complete");
    },
  };
}

export default myDopePlugin;
