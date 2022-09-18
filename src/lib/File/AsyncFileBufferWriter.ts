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

import { promises as $FS } from 'fs';
import { IFileWriter } from '../Common';
import { AbstractAsyncFileHelper } from './AbstractAsyncFileHelper';
import * as E from '../Errors';

/**
 * The writer of a file, without buffer supports, in synchronous mode.
 */
export class AsyncFileBufferWriter extends AbstractAsyncFileHelper implements IFileWriter<false> {

    private readonly _numBuffer = Buffer.allocUnsafe(8);

    private readonly _buffer: Buffer;

    /**
     * How many data has been written into the buffer.
     */
    private _bufferedSize: number = 0;

    /**
     * The position where should the buffer write at.
     */
    private _bufferStartAt: number;

    public constructor(
        protected _fd: $FS.FileHandle,
        size: number,
        pos: number = 0,
        public readonly bufferSize: number = 4096,
    ) {

        super(size, pos);

        this._buffer = Buffer.allocUnsafe(bufferSize);
        this._bufferStartAt = pos;
    }

    public static async createFromPath(
        path: string,
        pos: number = 0,
        bufferSize: number = 4096,
    ): Promise<IFileWriter<false>> {

        const fd = await $FS.open(path, 'w');

        return new AsyncFileBufferWriter(fd, (await fd.stat()).size, pos, bufferSize);
    }

    public static async createFromHandle(
        fd: $FS.FileHandle,
        pos: number = 0,
        bufferSize: number = 4096,
    ): Promise<IFileWriter<false>> {

        return new AsyncFileBufferWriter(fd, (await fd.stat()).size, pos, bufferSize);
    }

    public async flush(): Promise<void> {

        if (this._syncLock) {

            throw new E.E_IO_BUSY();
        }

        this._syncLock = true;

        try {

            await this._doFlush();
        }
        finally {

            this._syncLock = false;
        }
    }

    private async _doFlush(): Promise<void> {

        if (!this._bufferedSize) {

            return;
        }

        const { bytesWritten } = await this._fd.write(this._buffer, 0, this._bufferedSize, this._bufferStartAt);

        if (bytesWritten !== this._bufferedSize) {

            throw new E.E_NOT_WRITTEN_COMPLETELY({ bytesExpected: this._bufferedSize, bytesWritten });
        }

        this._bufferStartAt = this._pos;
        this._bufferedSize = 0;
    }

    /**
     * Check if the buffer is able to hold the new data.
     */
    private _isBufferable(bytes: number): boolean {

        return bytes + this._bufferedSize <= this.bufferSize;
    }

    protected _savePosition(dulta: number): void {

        this._pos += dulta;

        if (this._pos > this._length) {

            this._length = this._pos;
        }
    }

    protected async _write(buf: Buffer, length: number): Promise<void> {

        if (this._isBufferable(length)) {

            buf.copy(this._buffer, this._bufferedSize, 0, length);

            this._bufferedSize += length;

            this._savePosition(length);
        }
        else {

            await this._doFlush();

            const { bytesWritten } = await this._fd.write(buf, 0, length, this._pos);

            if (bytesWritten !== length) {

                throw new E.E_NOT_WRITTEN_COMPLETELY({ bytesExpected: length, bytesWritten });
            }

            this._savePosition(length);

            /**
             * Reset the position where should the buffer write at.
             */
            this._bufferStartAt = this._pos;
        }
    }

    public async writeBuffer(data: Buffer): Promise<void> {

        if (this._syncLock) {

            throw new E.E_IO_BUSY();
        }

        this._syncLock = true;

        try {

            await this._write(data, data.byteLength);
        }
        finally {

            this._syncLock = false;
        }
    }

    public async writeUInt8(v: number): Promise<void> {

        if (this._syncLock) {

            throw new E.E_IO_BUSY();
        }

        this._syncLock = true;

        try {

            this._numBuffer.writeUInt8(v);

            await this._write(this._numBuffer, 1);
        }
        finally {

            this._syncLock = false;
        }
    }

    public async writeUInt16LE(v: number): Promise<void> {

        if (this._syncLock) {

            throw new E.E_IO_BUSY();
        }

        this._syncLock = true;

        try {

            this._numBuffer.writeUInt16LE(v);

            await this._write(this._numBuffer, 2);
        }
        finally {

            this._syncLock = false;
        }
    }

    public async writeUInt16BE(v: number): Promise<void> {

        if (this._syncLock) {

            throw new E.E_IO_BUSY();
        }

        this._syncLock = true;

        try {

            this._numBuffer.writeUInt16BE(v);

            await this._write(this._numBuffer, 2);
        }
        finally {

            this._syncLock = false;
        }
    }

    public async writeUInt32LE(v: number): Promise<void> {

        if (this._syncLock) {

            throw new E.E_IO_BUSY();
        }

        this._syncLock = true;

        try {

            this._numBuffer.writeUInt32LE(v);

            await this._write(this._numBuffer, 4);
        }
        finally {

            this._syncLock = false;
        }
    }

    public async writeUInt32BE(v: number): Promise<void> {

        if (this._syncLock) {

            throw new E.E_IO_BUSY();
        }

        this._syncLock = true;

        try {

            this._numBuffer.writeUInt32BE(v);

            await this._write(this._numBuffer, 4);
        }
        finally {

            this._syncLock = false;
        }
    }

    public async writeUInt64LE(v: bigint | number): Promise<void> {

        if (this._syncLock) {

            throw new E.E_IO_BUSY();
        }

        this._syncLock = true;

        try {

            if (typeof v === 'bigint') {

                this._numBuffer.writeBigUInt64LE(v);
            }
            else {

                this._numBuffer.writeBigUInt64LE(BigInt(v));
            }

            await this._write(this._numBuffer, 8);
        }
        finally {

            this._syncLock = false;
        }
    }

    public async writeUInt64BE(v: bigint | number): Promise<void> {

        if (this._syncLock) {

            throw new E.E_IO_BUSY();
        }

        this._syncLock = true;

        try {

            if (typeof v === 'bigint') {

                this._numBuffer.writeBigUInt64BE(v);
            }
            else {

                this._numBuffer.writeBigUInt64BE(BigInt(v));
            }

            await this._write(this._numBuffer, 8);
        }
        finally {

            this._syncLock = false;
        }
    }

    public async writeInt8(v: number): Promise<void> {

        if (this._syncLock) {

            throw new E.E_IO_BUSY();
        }

        this._syncLock = true;

        try {

            this._numBuffer.writeInt8(v);

            await this._write(this._numBuffer, 1);
        }
        finally {

            this._syncLock = false;
        }
    }

    public async writeInt16LE(v: number): Promise<void> {

        if (this._syncLock) {

            throw new E.E_IO_BUSY();
        }

        this._syncLock = true;

        try {

            this._numBuffer.writeInt16LE(v);

            await this._write(this._numBuffer, 2);
        }
        finally {

            this._syncLock = false;
        }
    }

    public async writeInt16BE(v: number): Promise<void> {

        if (this._syncLock) {

            throw new E.E_IO_BUSY();
        }

        this._syncLock = true;

        try {

            this._numBuffer.writeInt16BE(v);

            await this._write(this._numBuffer, 2);
        }
        finally {

            this._syncLock = false;
        }
    }

    public async writeInt32LE(v: number): Promise<void> {

        if (this._syncLock) {

            throw new E.E_IO_BUSY();
        }

        this._syncLock = true;

        try {

            this._numBuffer.writeInt32LE(v);

            await this._write(this._numBuffer, 4);
        }
        finally {

            this._syncLock = false;
        }
    }

    public async writeInt32BE(v: number): Promise<void> {

        if (this._syncLock) {

            throw new E.E_IO_BUSY();
        }

        this._syncLock = true;

        try {

            this._numBuffer.writeInt32BE(v);

            await this._write(this._numBuffer, 4);
        }
        finally {

            this._syncLock = false;
        }
    }

    public async writeInt64LE(v: number | bigint): Promise<void> {

        if (this._syncLock) {

            throw new E.E_IO_BUSY();
        }

        this._syncLock = true;

        try {

            if (typeof v === 'bigint') {

                this._numBuffer.writeBigInt64LE(v);
            }
            else {

                this._numBuffer.writeBigInt64LE(BigInt(v));
            }

            await this._write(this._numBuffer, 8);
        }
        finally {

            this._syncLock = false;
        }
    }

    public async writeInt64BE(v: number | bigint): Promise<void> {

        if (this._syncLock) {

            throw new E.E_IO_BUSY();
        }

        this._syncLock = true;

        try {

            if (typeof v === 'bigint') {

                this._numBuffer.writeBigInt64BE(v);
            }
            else {

                this._numBuffer.writeBigInt64BE(BigInt(v));
            }

            await this._write(this._numBuffer, 8);
        }
        finally {

            this._syncLock = false;
        }
    }

    public async writeFloatBE(v: number): Promise<void> {

        if (this._syncLock) {

            throw new E.E_IO_BUSY();
        }

        this._syncLock = true;

        try {

            this._numBuffer.writeFloatBE(v);

            await this._write(this._numBuffer, 4);
        }
        finally {

            this._syncLock = false;
        }
    }

    public async writeFloatLE(v: number): Promise<void> {

        if (this._syncLock) {

            throw new E.E_IO_BUSY();
        }

        this._syncLock = true;

        try {

            this._numBuffer.writeFloatLE(v);

            await this._write(this._numBuffer, 4);
        }
        finally {

            this._syncLock = false;
        }
    }

    public async writeDoubleBE(v: number): Promise<void> {

        if (this._syncLock) {

            throw new E.E_IO_BUSY();
        }

        this._syncLock = true;

        try {

            this._numBuffer.writeDoubleBE(v);

            await this._write(this._numBuffer, 8);
        }
        finally {

            this._syncLock = false;
        }
    }

    public async writeDoubleLE(v: number): Promise<void> {

        if (this._syncLock) {

            throw new E.E_IO_BUSY();
        }

        this._syncLock = true;

        try {

            this._numBuffer.writeDoubleLE(v);

            await this._write(this._numBuffer, 8);
        }
        finally {

            this._syncLock = false;
        }
    }

    public async close(): Promise<void> {

        if (this._syncLock) {

            throw new E.E_IO_BUSY();
        }

        this._syncLock = true;

        try {

            await this._doFlush();

            await this._fd.close();
        }
        finally {

            this._syncLock = false;
        }
    }
}
