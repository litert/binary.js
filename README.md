# LiteRT/Binary

[![Strict TypeScript Checked](https://badgen.net/badge/TS/Strict "Strict TypeScript Checked")](https://www.typescriptlang.org)
[![npm version](https://img.shields.io/npm/v/@litert/binary.svg?colorB=brightgreen)](https://www.npmjs.com/package/@litert/binary "Stable Version")
[![License](https://img.shields.io/npm/l/@litert/binary.svg?maxAge=2592000?style=plastic)](https://github.com/litert/binary.js/blob/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/litert/binary.js.svg)](https://github.com/litert/binary.js/issues)
[![GitHub Releases](https://img.shields.io/github/release/litert/binary.js.svg)](https://github.com/litert/binary.js/releases "Stable Release")

The binary data operate library for LiteRT.

This library currently provides following components:

- [`BufferReader`](./src/examples/demo.BufferReader.ts): A helper of `Buffer` that controls the reading position automatically.
- [`BufferWriter`](./src/examples/demo.BufferWriter.ts): A helper of `Buffer` that controls the writing position automatically.
- [`AlignedBufferReader`](./src/examples/demo.AlignedBufferReader.ts): An implement of `BufferReader` with C-struct-like alignment supports.
- [`AlignedBufferWriter`](./src/examples/demo.AlignedBufferWriter.ts): An implement of `BufferWriter` with C-struct-like alignment supports.

## Installation

```sh
npm install @litert/binary --save
```

## Requirements

- Node.js v14.x (Or newer)
- TypeScript v4.1.x (Or newer)

## License

This library is published under [Apache-2.0](./LICENSE) license.
