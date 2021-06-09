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

const br = new $Binary.AlignedBufferReader(Buffer.from([
    0x01, 0x02, 0x03, 0x04,
    0x01, 0x02, 0x03, 0x04,
    0x01, 0x02, 0x03, 0x04,
    0x01, 0x02, 0x00, 0x00,
    0x01, 0x02, 0x03, 0x04,
    0x01, 0x02, 0x03, 0x04,
]));

console.debug(`Read Position #${br.position.toString().padStart(2, '0')}`);
console.log('0x' + br.readUInt8().toString(16).padStart(2, '0'));          // Should be 0x01
console.debug(`Read Position #${br.position.toString().padStart(2, '0')}`);
console.log('0x' + br.readUInt16LE().toString(16).padStart(4, '0'));       // Should be 0x0403
console.debug(`Read Position #${br.position.toString().padStart(2, '0')}`);
console.log('0x' + br.readUInt32LE().toString(16).padStart(8, '0'));       // Should be 0x04030201
console.debug(`Read Position #${br.position.toString().padStart(2, '0')}`);
console.log('0x' + br.readUIntSafeLE().toString(16).padStart(16, '0'));    // Should be 0x0000020104030201
console.debug(`Read Position #${br.position.toString().padStart(2, '0')}`);
