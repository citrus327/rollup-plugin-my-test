import { describe, it, afterEach, expect } from "vitest";
import { rollup, RollupBuild, OutputOptions, RollupOptions } from "rollup";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import myPlugin from "../src/index";
import path from "path";

const inputOptions: RollupOptions = {
  input: "test/manifest/index.js",
  plugins: [
    commonjs(),
    nodeResolve(),
    myPlugin({
      entries: [
        { find: "@test", replacement: path.resolve(process.cwd(), "./test") },
      ],
    }),
  ],
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

let bundle: RollupBuild;

describe("suite", () => {
  afterEach(() => {
    bundle?.close();
  });

  it("should passes", async () => {
    bundle = await rollup(inputOptions);
    const result = await Promise.all(
      outputOptions.map((opt) => {
        bundle.write(opt);
        return bundle.generate(opt);
      })
    );
    expect(result).toBeTruthy();
  });
});
