/**
 * Copyright 2022 Angus.Fenying <fenying@litert.org>
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

import * as $FS from 'fs';
import { AbstractFileHelper } from './AbstractFileHelper';
import { IBinaryReader } from '../Common';
import * as E from '../Errors';

export class SyncFileReader extends AbstractFileHelper implements IBinaryReader {

    private readonly _numBuffer: Buffer = Buffer.allocUnsafe(8);

    public constructor(
        protected _fd: number,
        pos: number = 0
    ) {

        super($FS.fstatSync(_fd).size, pos);
    }

    public readUIntSafeLE(): number {

        const buf = this._read(this._numBuffer, 8);

        const highDWord = buf.readUInt32LE(4);

        if (highDWord > 0x1FFFFF) {

            throw new E.E_NOT_SAFE_INTEGER({ position: this._pos - 8 });
        }

        const lowDWord = buf.readUInt32LE();

        return lowDWord + highDWord * 4294967296;
    }

    private _assertSafe(offset: number, length: number): void {

        if (offset + length > this._length) {

            throw new E.E_EOF({ position: offset, length });
        }
    }

    public readBuffer(length: number): Buffer {

        return this._read(Buffer.allocUnsafe(length), length);
    }

    protected _read(buf: Buffer, length: number): Buffer {

        this._assertSafe(this._pos, length);

        $FS.readSync(this._fd, buf, 0, length, this._pos);

        this._pos += length;

        return buf;
    }

    public readUInt8(): number {

        return this._read(this._numBuffer, 1).readUInt8();
    }

    public readFloatLE(): number {

        return this._read(this._numBuffer, 4).readFloatLE();
    }

    public readFloatBE(): number {

        return this._read(this._numBuffer, 4).readFloatBE();
    }

    public readDoubleLE(): number {

        return this._read(this._numBuffer, 8).readDoubleLE();
    }

    public readDoubleBE(): number {

        return this._read(this._numBuffer, 8).readDoubleBE();
    }

    public readUInt16LE(): number {

        return this._read(this._numBuffer, 2).readUInt16LE();
    }

    public readUInt16BE(): number {

        return this._read(this._numBuffer, 2).readUInt16BE();
    }

    public readUInt32LE(): number {

        return this._read(this._numBuffer, 4).readUInt32LE();
    }

    public readUInt32BE(): number {

        return this._read(this._numBuffer, 4).readUInt32BE();
    }

    public readUInt64LE(): bigint {

        return this._read(this._numBuffer, 8).readBigUInt64LE();
    }

    public readUInt64BE(): bigint {

        return this._read(this._numBuffer, 8).readBigUInt64BE();
    }

    public readInt8(): number {

        return this._read(this._numBuffer, 1).readInt8();
    }

    public readInt16LE(): number {

        return this._read(this._numBuffer, 2).readInt16LE();
    }

    public readInt16BE(): number {

        return this._read(this._numBuffer, 2).readInt16BE();
    }

    public readInt32LE(): number {

        return this._read(this._numBuffer, 4).readInt32LE();
    }

    public readInt32BE(): number {

        return this._read(this._numBuffer, 4).readInt32BE();
    }

    public readInt64LE(): bigint {

        return this._read(this._numBuffer, 8).readBigInt64LE();
    }

    public readInt64BE(): bigint {

        return this._read(this._numBuffer, 8).readBigInt64BE();
    }
}
