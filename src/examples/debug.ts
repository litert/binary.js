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

const abw = new $Binary.AlignedBufferWriter();

abw.writeUInt8(V1);
abw.writeUInt32LE(V2);
abw.writeUInt64LE(V3);
abw.writeUInt32LE(V2);

const abr = new $Binary.AlignedBufferReader(abw.truncate());

console.log(abr.readUInt8());
console.log(`#${abr.position}/${abr.length}`);
console.log(abr.readUInt32LE());
console.log(`#${abr.position}/${abr.length}`);
console.log(abr.readUIntSafeLE());
console.log(`#${abr.position}/${abr.length}`);
console.log(abr.readUInt32LE());
console.log(`#${abr.position}/${abr.length}`);
