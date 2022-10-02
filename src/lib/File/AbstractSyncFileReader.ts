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
import { AbstractSyncFileHelper } from './AbstractSyncFileHelper';
import { IFileReader } from '../Common';
import * as E from '../Errors';

export abstract class AbstractSyncFileReader extends AbstractSyncFileHelper implements IFileReader {

    private readonly _numBuffer: Buffer = Buffer.allocUnsafe(8);

    public constructor(
        protected _fd: number,
        pos: number,
        public readonly bufferSize: number,
    ) {

        super($FS.fstatSync(_fd).size, pos);
    }

    public close(): void {

        $FS.closeSync(this._fd);
    }

    public readUIntSafeLE(): number {

        const buf = this._read(this._numBuffer, 8, false);

        const highDWord = buf.readUInt32LE(4);

        if (highDWord > 0x1FFFFF) {

            throw new E.E_NOT_SAFE_INTEGER({ position: this._pos - 8 });
        }

        const lowDWord = buf.readUInt32LE();

        return lowDWord + highDWord * 4294967296;
    }

    public readBuffer(length: number, _copy?: boolean, buffer?: Buffer): Buffer {

        buffer ??= Buffer.allocUnsafe(length);

        return this._read(buffer, length);
    }

    protected abstract _read(buf: Buffer, length: number, copy?: boolean): Buffer;

    public readUInt8(): number {

        return this._read(this._numBuffer, 1, false).readUInt8();
    }

    public readFloatLE(): number {

        return this._read(this._numBuffer, 4, false).readFloatLE();
    }

    public readFloatBE(): number {

        return this._read(this._numBuffer, 4, false).readFloatBE();
    }

    public readDoubleLE(): number {

        return this._read(this._numBuffer, 8, false).readDoubleLE();
    }

    public readDoubleBE(): number {

        return this._read(this._numBuffer, 8, false).readDoubleBE();
    }

    public readUInt16LE(): number {

        return this._read(this._numBuffer, 2, false).readUInt16LE();
    }

    public readUInt16BE(): number {

        return this._read(this._numBuffer, 2, false).readUInt16BE();
    }

    public readUInt32LE(): number {

        return this._read(this._numBuffer, 4, false).readUInt32LE();
    }

    public readUInt32BE(): number {

        return this._read(this._numBuffer, 4, false).readUInt32BE();
    }

    public readUInt64LE(): bigint {

        return this._read(this._numBuffer, 8, false).readBigUInt64LE();
    }

    public readUInt64BE(): bigint {

        return this._read(this._numBuffer, 8, false).readBigUInt64BE();
    }

    public readInt8(): number {

        return this._read(this._numBuffer, 1, false).readInt8();
    }

    public readInt16LE(): number {

        return this._read(this._numBuffer, 2, false).readInt16LE();
    }

    public readInt16BE(): number {

        return this._read(this._numBuffer, 2, false).readInt16BE();
    }

    public readInt32LE(): number {

        return this._read(this._numBuffer, 4, false).readInt32LE();
    }

    public readInt32BE(): number {

        return this._read(this._numBuffer, 4, false).readInt32BE();
    }

    public readInt64LE(): bigint {

        return this._read(this._numBuffer, 8, false).readBigInt64LE();
    }

    public readInt64BE(): bigint {

        return this._read(this._numBuffer, 8, false).readBigInt64BE();
    }
}
