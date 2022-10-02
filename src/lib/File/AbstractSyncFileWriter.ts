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
import { IFileWriter } from '../Common';

/**
 * The writer of a file, without buffer supports, in synchronous mode.
 */
export abstract class AbstractSyncFileWriter extends AbstractSyncFileHelper implements IFileWriter {

    private readonly _numBuffer = Buffer.allocUnsafe(8);

    public constructor(
        protected _fd: number,
        pos: number,
        public readonly bufferSize: number,
    ) {

        super($FS.fstatSync(_fd).size, pos);
    }

    public abstract flush(): void;

    protected _savePosition(dulta: number): void {

        this._pos += dulta;

        if (this._pos > this._length) {

            this._length = this._pos;
        }
    }

    protected abstract _write(buf: Buffer, length: number): void;

    public writeBuffer(data: Buffer): void {

        this._write(data, data.byteLength);
    }

    public writeUInt8(v: number): void {

        this._numBuffer.writeUInt8(v);

        this._write(this._numBuffer, 1);
    }

    public writeUInt16LE(v: number): void {

        this._numBuffer.writeUInt16LE(v);

        this._write(this._numBuffer, 2);
    }

    public writeUInt16BE(v: number): void {

        this._numBuffer.writeUInt16BE(v);

        this._write(this._numBuffer, 2);
    }

    public writeUInt32LE(v: number): void {

        this._numBuffer.writeUInt32LE(v);

        this._write(this._numBuffer, 4);
    }

    public writeUInt32BE(v: number): void {

        this._numBuffer.writeUInt32BE(v);

        this._write(this._numBuffer, 4);
    }

    public writeUInt64LE(v: bigint | number): void {

        if (typeof v === 'bigint') {

            this._numBuffer.writeBigUInt64LE(v);
        }
        else {

            this._numBuffer.writeBigUInt64LE(BigInt(v));
        }

        this._write(this._numBuffer, 8);
    }

    public writeUInt64BE(v: bigint | number): void {

        if (typeof v === 'bigint') {

            this._numBuffer.writeBigUInt64BE(v);
        }
        else {

            this._numBuffer.writeBigUInt64BE(BigInt(v));
        }

        this._write(this._numBuffer, 8);
    }

    public writeInt8(v: number): void {

        this._numBuffer.writeInt8(v);

        this._write(this._numBuffer, 1);
    }

    public writeInt16LE(v: number): void {

        this._numBuffer.writeInt16LE(v);

        this._write(this._numBuffer, 2);
    }

    public writeInt16BE(v: number): void {

        this._numBuffer.writeInt16BE(v);

        this._write(this._numBuffer, 2);
    }

    public writeInt32LE(v: number): void {

        this._numBuffer.writeInt32LE(v);

        this._write(this._numBuffer, 4);
    }

    public writeInt32BE(v: number): void {

        this._numBuffer.writeInt32BE(v);

        this._write(this._numBuffer, 4);
    }

    public writeInt64LE(v: number | bigint): void {

        if (typeof v === 'bigint') {

            this._numBuffer.writeBigInt64LE(v);
        }
        else {

            this._numBuffer.writeBigInt64LE(BigInt(v));
        }

        this._write(this._numBuffer, 8);
    }

    public writeInt64BE(v: number | bigint): void {

        if (typeof v === 'bigint') {

            this._numBuffer.writeBigInt64BE(v);
        }
        else {

            this._numBuffer.writeBigInt64BE(BigInt(v));
        }

        this._write(this._numBuffer, 8);
    }

    public writeFloatBE(v: number): void {

        this._numBuffer.writeFloatBE(v);

        this._write(this._numBuffer, 4);
    }

    public writeFloatLE(v: number): void {

        this._numBuffer.writeFloatLE(v);

        this._write(this._numBuffer, 4);
    }

    public writeDoubleBE(v: number): void {

        this._numBuffer.writeDoubleBE(v);

        this._write(this._numBuffer, 8);
    }

    public writeDoubleLE(v: number): void {

        this._numBuffer.writeDoubleLE(v);

        this._write(this._numBuffer, 8);
    }

    public close(): void {

        $FS.closeSync(this._fd);
    }

    public seekDulta(dultaOffset: number): number {

        return this.seek(this._pos + dultaOffset);
    }
}
