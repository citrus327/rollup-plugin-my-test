import { describe, it, afterEach, expect } from "vitest";
import { rollup } from "rollup";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import myPlugin from "../dist/index";
import { RollupBuild } from "rollup";
import { OutputOptions } from "rollup";
import { RollupOptions } from "rollup";

const inputOptions: RollupOptions = {
  input: "test/manifest/index.js",
  plugins: [commonjs(), nodeResolve(), myPlugin()],
};

const outputOptions: OutputOptions[] = [
  {
    file: "test/dist/bundle.cjs",
    format: "cjs",
  },
  {
    file: "test/dist/bundle.mjs",
    format: "es",
  },
];

async function generateOutputs(bundle: RollupBuild) {
  return await Promise.all(
    outputOptions.map((opt) => {
      return bundle.generate(opt);
    })
  );
}

let bundle: RollupBuild;

describe("suite", () => {
  afterEach(() => {
    console.log(bundle.watchFiles);
    bundle?.close();
  });

  it("should passes", async () => {
    bundle = await rollup(inputOptions);
    const result = await generateOutputs(bundle);
    expect(result).toMatchSnapshot();
  });
});
