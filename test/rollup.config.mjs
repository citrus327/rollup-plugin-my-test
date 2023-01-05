import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";

export default {
  input: "test/src/index.js",
  output: [
    {
      file: "test/dist/bundle.cjs",
      format: "cjs",
    },
    {
      file: "test/dist/bundle.mjs",
      format: "es",
    },
  ],
  plugins: [commonjs(), nodeResolve()],
};
