import { rollup } from "rollup";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import myPlugin from "../dist/index";

const inputOptions = {
  input: "test/src/index.js",
  plugins: [commonjs(), nodeResolve(), myPlugin()],
};

const outputOptions = [
  {
    file: "test/dist/bundle.cjs",
    format: "cjs",
  },
  {
    file: "test/dist/bundle.mjs",
    format: "es",
  },
];

async function build() {
  let bundle;
  let buildFailed = false;
  try {
    // create a bundle
    bundle = await rollup(inputOptions);

    // an array of file names this bundle depends on
    console.log(bundle.watchFiles);

    await generateOutputs(bundle);
  } catch (error) {
    buildFailed = true;
    // do some error reporting
    console.error(error);
  }
  if (bundle) {
    // closes the bundle
    await bundle.close();
  }
  process.exit(buildFailed ? 1 : 0);
}

async function generateOutputs(bundle) {
  for (const outputOption of outputOptions) {
    const { output } = await bundle.generate(outputOption);

    for (const chunkOrAsset of output) {
      if (chunkOrAsset.type === "asset") {
        console.log("Asset", chunkOrAsset);
      } else {
        console.log("Chunk", chunkOrAsset.modules);
      }
    }
  }
}

build();
