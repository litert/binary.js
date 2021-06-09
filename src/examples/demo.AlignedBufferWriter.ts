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

const bw: $Binary.IBufferWriter = new $Binary.AlignedBufferWriter();

console.debug(`Write Position #${bw.position.toString().padStart(2, '0')}`);
bw.writeUInt8(0x01);
console.debug(`Write Position #${bw.position.toString().padStart(2, '0')}`);
bw.writeUInt32LE(0x04030201);
console.debug(`Write Position #${bw.position.toString().padStart(2, '0')}`);
bw.writeUInt64LE(0x0000030201040302);
console.debug(`Write Position #${bw.position.toString().padStart(2, '0')}`);
bw.writeDoubleBE(0.223);
console.debug(`Write Position #${bw.position.toString().padStart(2, '0')}`);

const br: $Binary.IBinaryReader = new $Binary.AlignedBufferReader(bw.truncate()); // Get the writing buffer on current position

console.debug(`Read Position #${br.position.toString().padStart(2, '0')}`);
console.log('0x' + br.readUInt8().toString(16).padStart(2, '0'));           // Should be 0x01
console.debug(`Read Position #${br.position.toString().padStart(2, '0')}`);
console.log('0x' + br.readUInt32LE().toString(16).padStart(8, '0'));        // Should be 0x01040302
console.debug(`Read Position #${br.position.toString().padStart(2, '0')}`);
console.log('0x' + br.readUIntSafeLE().toString(16).padStart(16, '0'));     // Should be 0x0000030201040302
console.debug(`Read Position #${br.position.toString().padStart(2, '0')}`);
console.log(br.readDoubleBE());                                             // Should be 0.223
console.debug(`Read Position #${br.position.toString().padStart(2, '0')}`);
