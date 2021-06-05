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

import * as E from './Errors';
import { AbstractBufferHelper } from './AbstractBufferHelper';
import { IBinaryReader } from './Common';

export class AlignedBufferReader extends AbstractBufferHelper implements IBinaryReader {

    protected _prepare(pos: number, length: number, unit: boolean = true): number {

        if (unit) {

            const r = pos % length;

            if (r) {

                pos += length - r;
            }
        }

        if (pos + length > this._buf.byteLength) {

            throw new E.E_EOF({ position: pos, length });
        }

        return pos;
    }

    public readUIntSafeLE(): number {

        const LENGTH = 8;

        const pos = this._prepare(this._pos, LENGTH);

        const highDWord = this._buf.readUInt32LE(pos + 4);

        if (highDWord > 0x1FFFFF) {

            throw new E.E_NOT_SAFE_INTEGER({ position: pos });
        }

        const lowDWord = this._buf.readUInt32LE(pos);

        this._pos = pos + LENGTH;

        return lowDWord + highDWord * 4294967296;
    }

    public readBuffer(length: number, copy: boolean = false): Buffer {

        const pos = this._prepare(this._pos, length, false);

        if (copy) {

            const ret = Buffer.allocUnsafe(length);
            this._buf.copy(ret, 0, pos, pos + length);

            this._pos = pos + length;
            return ret;
        }

        const ret = this._buf.slice(pos, pos + length);

        this._pos = pos + length;

        return ret;
    }

    public readUInt8(): number {

        const LENGTH = 1;

        const pos = this._prepare(this._pos, LENGTH, false);

        const ret = this._buf.readUInt8(pos);

        this._pos = pos + LENGTH;

        return ret;
    }

    public readFloatLE(): number {

        const LENGTH = 4;

        const pos = this._prepare(this._pos, LENGTH);

        const ret = this._buf.readFloatLE(pos);

        this._pos = pos + LENGTH;

        return ret;
    }

    public readFloatBE(): number {

        const LENGTH = 4;

        const pos = this._prepare(this._pos, LENGTH);

        const ret = this._buf.readFloatBE(pos);

        this._pos = pos + LENGTH;

        return ret;
    }

    public readDoubleLE(): number {

        const LENGTH = 8;

        const pos = this._prepare(this._pos, LENGTH);

        const ret = this._buf.readDoubleLE(pos);

        this._pos = pos + LENGTH;

        return ret;
    }

    public readDoubleBE(): number {

        const LENGTH = 8;

        const pos = this._prepare(this._pos, LENGTH);

        const ret = this._buf.readDoubleBE(pos);

        this._pos = pos + LENGTH;

        return ret;
    }

    public readUInt16LE(): number {

        const LENGTH = 2;

        const pos = this._prepare(this._pos, LENGTH);

        const ret = this._buf.readUInt16LE(pos);

        this._pos = pos + LENGTH;

        return ret;
    }

    public readUInt16BE(): number {

        const LENGTH = 2;

        const pos = this._prepare(this._pos, LENGTH);

        const ret = this._buf.readUInt16BE(pos);

        this._pos = pos + LENGTH;

        return ret;
    }

    public readUInt32LE(): number {

        const LENGTH = 4;

        const pos = this._prepare(this._pos, LENGTH);

        const ret = this._buf.readUInt32LE(pos);

        this._pos = pos + LENGTH;

        return ret;
    }

    public readUInt32BE(): number {

        const LENGTH = 4;

        const pos = this._prepare(this._pos, LENGTH);

        const ret = this._buf.readUInt32BE(pos);

        this._pos = pos + LENGTH;

        return ret;
    }

    public readUInt64LE(): bigint {

        const LENGTH = 8;

        const pos = this._prepare(this._pos, LENGTH);

        let ret = this._buf.readBigUInt64LE(pos);

        this._pos = pos + LENGTH;

        return ret;
    }

    public readUInt64BE(): bigint {

        const LENGTH = 8;

        const pos = this._prepare(this._pos, LENGTH);

        let ret = this._buf.readBigUInt64BE(pos);

        this._pos = pos + LENGTH;

        return ret;
    }

    public readInt8(): number {

        const LENGTH = 1;

        const pos = this._prepare(this._pos, LENGTH, false);

        const ret = this._buf.readInt8(pos);

        this._pos = pos + LENGTH;

        return ret;
    }

    public readInt16LE(): number {

        const LENGTH = 2;

        const pos = this._prepare(this._pos, LENGTH);

        const ret = this._buf.readInt16LE(pos);

        this._pos = pos + LENGTH;

        return ret;
    }

    public readInt16BE(): number {

        const LENGTH = 2;

        const pos = this._prepare(this._pos, LENGTH);

        const ret = this._buf.readInt16BE(pos);

        this._pos = pos + LENGTH;

        return ret;
    }

    public readInt32LE(): number {

        const LENGTH = 4;

        const pos = this._prepare(this._pos, LENGTH);

        const ret = this._buf.readInt32LE(pos);

        this._pos = pos + LENGTH;

        return ret;
    }

    public readInt32BE(): number {

        const LENGTH = 4;

        const pos = this._prepare(this._pos, LENGTH);

        const ret = this._buf.readInt32BE(pos);

        this._pos = pos + LENGTH;

        return ret;
    }

    public readInt64LE(): bigint {

        const LENGTH = 8;

        const pos = this._prepare(this._pos, LENGTH);

        let ret = this._buf.readBigInt64LE(pos);

        this._pos = pos + LENGTH;

        return ret;
    }

    public readInt64BE(): bigint {

        const LENGTH = 8;

        const pos = this._prepare(this._pos, LENGTH);

        let ret = this._buf.readBigInt64BE(pos);

        this._pos = pos + LENGTH;

        return ret;
    }

}
