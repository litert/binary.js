import { AbstractBufferHelper } from './AbstractBufferHelper';
import { IBufferWriter } from './Common';
import * as E from './Errors';

export class AlignedBufferWriter extends AbstractBufferHelper implements IBufferWriter {

    public constructor(
        buf: Buffer = Buffer.allocUnsafe(1024),
        pos: number = 0,
        public autoAllocate: boolean = true,
        protected _autoAllocateSize: number = 1024
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

            if (this.autoAllocate) {

                this.allocate(Math.ceil(length / this._autoAllocateSize) * this._autoAllocateSize);
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
