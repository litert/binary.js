import * as $Binary from '../lib';

const bw = new $Binary.BufferWriter();

const V1 = 240;
const V2 = 12345678;
const V3 = 2939239193332;

bw.writeUInt8(V1);
bw.writeUInt32LE(V2);
bw.writeUInt64LE(V3);

const br = new $Binary.BufferReader(bw.truncate());

console.log(br.readUInt8());
console.log(br.readUInt32LE());
console.log(br.readUIntSafeLE());
