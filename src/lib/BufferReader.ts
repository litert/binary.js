import { AbstractBufferHelper } from './AbstractBufferHelper';
import { IBinaryReader } from './Common';
import * as E from './Errors';

export class BufferReader extends AbstractBufferHelper implements IBinaryReader {

    public readUIntSafeLE(): number {

        const LENGTH = 8;

        this._assertSafe(this._pos, LENGTH);

        const highDWord = this._buf.readUInt32LE(this._pos + 4);

        if (highDWord > 0x1FFFFF) {

            throw new E.E_NOT_SAFE_INTEGER({ position: this._pos });
        }

        const lowDWord = this._buf.readUInt32LE(this._pos);

        this._pos += LENGTH;

        return lowDWord + highDWord * 4294967296;
    }

    private _assertSafe(offset: number, length: number): void {

        if (offset + length > this._buf.byteLength) {

            throw new E.E_EOF({ position: offset, length });
        }
    }

    public readBuffer(length: number, copy: boolean = false): Buffer {

        this._assertSafe(this._pos, length);

        if (copy) {

            const ret = Buffer.allocUnsafe(length);
            this._buf.copy(ret, 0, this._pos, this._pos + length);

            this._pos += length;
            return ret;
        }

        const ret = this._buf.slice(this._pos, this._pos + length);

        this._pos += length;

        return ret;
    }

    public readUInt8(): number {

        const LENGTH = 1;

        this._assertSafe(this._pos, LENGTH);

        const ret = this._buf.readUInt8(this._pos);

        this._pos += LENGTH;

        return ret;
    }

    public readFloatLE(): number {

        const LENGTH = 4;

        this._assertSafe(this._pos, LENGTH);

        const ret = this._buf.readFloatLE(this._pos);

        this._pos += LENGTH;

        return ret;
    }

    public readFloatBE(): number {

        const LENGTH = 4;

        this._assertSafe(this._pos, LENGTH);

        const ret = this._buf.readFloatBE(this._pos);

        this._pos += LENGTH;

        return ret;
    }

    public readDoubleLE(): number {

        const LENGTH = 8;

        this._assertSafe(this._pos, LENGTH);

        const ret = this._buf.readDoubleLE(this._pos);

        this._pos += LENGTH;

        return ret;
    }

    public readDoubleBE(): number {

        const LENGTH = 8;

        this._assertSafe(this._pos, LENGTH);

        const ret = this._buf.readDoubleBE(this._pos);

        this._pos += LENGTH;

        return ret;
    }

    public readUInt16LE(): number {

        const LENGTH = 2;

        this._assertSafe(this._pos, LENGTH);

        const ret = this._buf.readUInt16LE(this._pos);

        this._pos += LENGTH;

        return ret;
    }

    public readUInt16BE(): number {

        const LENGTH = 2;

        this._assertSafe(this._pos, LENGTH);

        const ret = this._buf.readUInt16BE(this._pos);

        this._pos += LENGTH;

        return ret;
    }

    public readUInt32LE(): number {

        const LENGTH = 4;

        this._assertSafe(this._pos, LENGTH);

        const ret = this._buf.readUInt32LE(this._pos);

        this._pos += LENGTH;

        return ret;
    }

    public readUInt32BE(): number {

        const LENGTH = 4;

        this._assertSafe(this._pos, LENGTH);

        const ret = this._buf.readUInt32BE(this._pos);

        this._pos += LENGTH;

        return ret;
    }

    public readUInt64LE(): bigint {

        const LENGTH = 8;

        this._assertSafe(this._pos, LENGTH);

        let ret = this._buf.readBigUInt64LE(this._pos);

        this._pos += LENGTH;

        return ret;
    }

    public readUInt64BE(): bigint {

        const LENGTH = 8;

        this._assertSafe(this._pos, LENGTH);

        let ret = this._buf.readBigUInt64BE(this._pos);

        this._pos += LENGTH;

        return ret;
    }

    public readInt8(): number {

        const LENGTH = 1;

        this._assertSafe(this._pos, LENGTH);

        const ret = this._buf.readInt8(this._pos);

        this._pos += LENGTH;

        return ret;
    }

    public readInt16LE(): number {

        const LENGTH = 2;

        this._assertSafe(this._pos, LENGTH);

        const ret = this._buf.readInt16LE(this._pos);

        this._pos += LENGTH;

        return ret;
    }

    public readInt16BE(): number {

        const LENGTH = 2;

        this._assertSafe(this._pos, LENGTH);

        const ret = this._buf.readInt16BE(this._pos);

        this._pos += LENGTH;

        return ret;
    }

    public readInt32LE(): number {

        const LENGTH = 4;

        this._assertSafe(this._pos, LENGTH);

        const ret = this._buf.readInt32LE(this._pos);

        this._pos += LENGTH;

        return ret;
    }

    public readInt32BE(): number {

        const LENGTH = 4;

        this._assertSafe(this._pos, LENGTH);

        const ret = this._buf.readInt32BE(this._pos);

        this._pos += LENGTH;

        return ret;
    }

    public readInt64LE(): bigint {

        const LENGTH = 8;

        this._assertSafe(this._pos, LENGTH);

        let ret = this._buf.readBigInt64LE(this._pos);

        this._pos += LENGTH;

        return ret;
    }

    public readInt64BE(): bigint {

        const LENGTH = 8;

        this._assertSafe(this._pos, LENGTH);

        let ret = this._buf.readBigInt64BE(this._pos);

        this._pos += LENGTH;

        return ret;
    }

}
