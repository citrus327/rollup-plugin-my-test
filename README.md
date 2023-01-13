# rollup-plugin-my-test

rollup-plugin-my-test

https://rollupjs.org/guide/en/#a-simple-example

## Development

`npm run start` to start plugin build watch

`npm run test` to test bundle in test folder

## Notes

1. rollup/node-resolve plugin 并没有按照预期去读取 module 字段。
   https://github.com/rollup/plugins/blob/6195a506dbfc9b1186f3f0459f0af0ebec1b56e1/packages/node-resolve/src/util.js#L87
   默认 mainFields 为`['module', 'main']`, 优先级是按照从后往前，而非从前往后
