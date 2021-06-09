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

import { AbstractBufferHelper } from './AbstractBufferHelper';
import { IBufferWriter } from './Common';
import * as E from './Errors';

export class AlignedBufferWriter extends AbstractBufferHelper implements IBufferWriter {

    public constructor(
        buf: Buffer = Buffer.allocUnsafe(1024),
        pos: number = 0,
        public autoAllocateSize: number = 1024
    ) {

        super(buf, pos);
    }

    public allocate(length: number): void {

        const buf = Buffer.allocUnsafe(this._buf.byteLength + length);

        this._buf.copy(buf);

        this._buf = buf;
    }

    public truncate(): Buffer {

        return this._buf.slice(0, this._pos);
    }

    private _prepare(pos: number, length: number, unit: boolean = true): number {

        if (unit) {

            const r = pos % length;

            if (r) {

                pos += length - r;
            }
        }

        if (pos + length > this._buf.byteLength) {

            if (this.autoAllocateSize > 0) {

                this.allocate(Math.ceil(length / this.autoAllocateSize) * this.autoAllocateSize);
            }
            else {

                throw new E.E_EOF({ position: pos, length });
            }
        }

        return pos;
    }

    public writeBuffer(data: Buffer): void {

        const pos = this._prepare(this._pos, data.byteLength, false);

        data.copy(this._buf, pos);

        this._pos = pos + data.byteLength;
    }

    public writeUInt8(v: number): void {

        const LENGTH = 1;

        const pos = this._prepare(this._pos, LENGTH, false);

        this._buf.writeUInt8(v, pos);

        this._pos = pos + LENGTH;
    }

    public writeUInt16LE(v: number): void {

        const LENGTH = 2;

        const pos = this._prepare(this._pos, LENGTH);

        this._buf.writeUInt16LE(v, pos);

        this._pos = pos + LENGTH;
    }

    public writeUInt16BE(v: number): void {

        const LENGTH = 2;

        const pos = this._prepare(this._pos, LENGTH);

        this._buf.writeUInt16BE(v, pos);

        this._pos = pos + LENGTH;
    }

    public writeUInt32LE(v: number): void {

        const LENGTH = 4;

        const pos = this._prepare(this._pos, LENGTH);

        this._buf.writeUInt32LE(v, pos);

        this._pos = pos + LENGTH;
    }

    public writeUInt32BE(v: number): void {

        const LENGTH = 4;

        const pos = this._prepare(this._pos, LENGTH);

        this._buf.writeUInt32BE(v, pos);

        this._pos = pos + LENGTH;
    }

    public writeUInt64LE(v: bigint | number): void {

        const LENGTH = 8;

        const pos = this._prepare(this._pos, LENGTH);

        if (typeof v === 'bigint') {

            this._buf.writeBigUInt64LE(v, pos);
        }
        else {

            this._buf.writeBigUInt64LE(BigInt(v), pos);
        }

        this._pos = pos + LENGTH;
    }

    public writeUInt64BE(v: bigint | number): void {

        const LENGTH = 8;

        const pos = this._prepare(this._pos, LENGTH);

        if (typeof v === 'bigint') {

            this._buf.writeBigUInt64LE(v, pos);
        }
        else {

            this._buf.writeBigUInt64LE(BigInt(v), pos);
        }

        this._pos = pos + LENGTH;
    }

    public writeInt8(v: number): void {

        const LENGTH = 1;

        const pos = this._prepare(this._pos, LENGTH, false);

        this._buf.writeInt8(v, pos);

        this._pos = pos + LENGTH;
    }

    public writeInt16LE(v: number): void {

        const LENGTH = 2;

        const pos = this._prepare(this._pos, LENGTH);

        this._buf.writeInt16LE(v, pos);

        this._pos = pos + LENGTH;
    }

    public writeInt16BE(v: number): void {

        const LENGTH = 2;

        const pos = this._prepare(this._pos, LENGTH);

        this._buf.writeInt16BE(v, pos);

        this._pos = pos + LENGTH;
    }

    public writeInt32LE(v: number): void {

        const LENGTH = 4;

        const pos = this._prepare(this._pos, LENGTH);

        this._buf.writeInt32LE(v, pos);

        this._pos = pos + LENGTH;
    }

    public writeInt32BE(v: number): void {

        const LENGTH = 4;

        const pos = this._prepare(this._pos, LENGTH);

        this._buf.writeInt32BE(v, pos);

        this._pos = pos + LENGTH;
    }

    public writeFloatLE(v: number): void {

        const LENGTH = 4;

        const pos = this._prepare(this._pos, LENGTH);

        this._buf.writeFloatLE(v, pos);

        this._pos = pos + LENGTH;
    }

    public writeFloatBE(v: number): void {

        const LENGTH = 4;

        const pos = this._prepare(this._pos, LENGTH);

        this._buf.writeFloatBE(v, pos);

        this._pos = pos + LENGTH;
    }

    public writeDoubleLE(v: number): void {

        const LENGTH = 8;

        const pos = this._prepare(this._pos, LENGTH);

        this._buf.writeDoubleLE(v, pos);

        this._pos = pos + LENGTH;
    }

    public writeDoubleBE(v: number): void {

        const LENGTH = 8;

        const pos = this._prepare(this._pos, LENGTH);

        this._buf.writeDoubleBE(v, pos);

        this._pos = pos + LENGTH;
    }

    public writeInt64LE(v: number | bigint): void {

        const LENGTH = 8;

        const pos = this._prepare(this._pos, LENGTH);

        if (typeof v === 'bigint') {

            this._buf.writeBigInt64LE(v, pos);
        }
        else {

            this._buf.writeBigInt64LE(BigInt(v), pos);
        }

        this._pos = pos + LENGTH;
    }

    public writeInt64BE(v: number | bigint): void {

        const LENGTH = 8;

        const pos = this._prepare(this._pos, LENGTH);

        if (typeof v === 'bigint') {

            this._buf.writeBigInt64BE(v, pos);
        }
        else {

            this._buf.writeBigInt64BE(BigInt(v), pos);
        }

        this._pos = pos + LENGTH;
    }
}
