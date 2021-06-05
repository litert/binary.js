/**
 * Copyright 2021 Angus.Fenying <fenying@litert.org>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
