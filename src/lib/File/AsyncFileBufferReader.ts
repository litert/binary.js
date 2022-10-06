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
import { IFileReader } from '../Common';
import * as E from '../Errors';
import { AbstractAsyncFileReader } from './AbstractAsyncFileReader';

const VOID_RESOLVED_PROMISE = Promise.resolve();

const EMPTY_BUFFER = Buffer.allocUnsafe(0);
const DEFAULT_BUFFER_SIZE = 4096;

/**
 * The writer of a file, without buffer supports, in synchronous mode.
 */
export class AsyncFileBufferReader extends AbstractAsyncFileReader implements IFileReader<false> {

    private readonly _realBuffer: Buffer;

    private _buffer: Buffer;

    /**
     * The position where should the buffer write at.
     */
    private _bufferStartAt: number;

    public readonly bufferSize: number = 0;

    public constructor(
        fd: $FS.FileHandle,
        size: number,
        pos: number = 0,
        bufferSize: number = DEFAULT_BUFFER_SIZE
    ) {

        super(fd, size, pos, bufferSize);

        this._realBuffer = Buffer.allocUnsafe(bufferSize);
        this._buffer = EMPTY_BUFFER;
        this._bufferStartAt = pos;
    }

    public static async createFromPath(
        path: string,
        pos: number = 0,
        bufferSize: number = DEFAULT_BUFFER_SIZE
    ): Promise<IFileReader<false>> {

        const fd = await $FS.open(path, 'r');

        return new AsyncFileBufferReader(fd, (await fd.stat()).size, pos, bufferSize);
    }

    public static async createFromFileDescriptor(
        fd: $FS.FileHandle,
        pos: number = 0,
        bufferSize: number = DEFAULT_BUFFER_SIZE
    ): Promise<IFileReader<false>> {

        return new AsyncFileBufferReader(fd, (await fd.stat()).size, pos, bufferSize);
    }

    public flush(): Promise<void> {

        return VOID_RESOLVED_PROMISE;
    }

    protected async _read(buf: Buffer, length: number, copy: boolean = true): Promise<Buffer> {

        if (this._pos + length > this._length) {

            throw new E.E_EOF({ position: this._pos, length });
        }

        if (length > this.bufferSize) {

            await this._fd.read(buf, 0, length, this._pos);

            this._pos += length;

            this._buffer = this._realBuffer.subarray(
                0,
                (await this._fd.read(this._realBuffer, 0, this.bufferSize, this._pos)).bytesRead
            );
            this._bufferStartAt = this._pos;

            return buf;
        }

        if (length > this._buffer.byteLength) {

            this._buffer = this._realBuffer.subarray(
                0,
                (await this._fd.read(this._realBuffer, 0, this.bufferSize, this._pos)).bytesRead
            );
            this._bufferStartAt = this._pos;
        }

        const reachedEndOfBuffer = length === this._buffer.length;

        copy ||= reachedEndOfBuffer;

        if (copy) {
            this._buffer.copy(buf, 0, 0, length);
        }
        else {
            buf = this._buffer.subarray(0, length);
        }

        this._pos += length;

        if (reachedEndOfBuffer) {

            this._buffer = this._realBuffer.subarray(
                0,
                (await this._fd.read(this._realBuffer, 0, this.bufferSize, this._pos)).bytesRead
            );

            this._bufferStartAt = this._pos;
        }
        else {

            this._buffer = this._buffer.subarray(length);
        }

        return buf;
    }

    public async seek(pos: number): Promise<number> {

        if (pos === this._pos) {

            return this._pos;
        }

        const prevPos = this._pos;

        if (pos >= this._bufferStartAt && pos < this._bufferStartAt + this.bufferSize) {

            this._buffer = this._realBuffer.subarray(pos - this._bufferStartAt);
            this._pos = pos;
        }
        else if (pos >= 0 && pos < this._length) {

            this._buffer = this._realBuffer.subarray(
                0,
                (await this._fd.read(this._realBuffer, 0, this.bufferSize, pos)).bytesRead
            );
            this._bufferStartAt = this._pos = pos;
        }
        else {

            throw new E.E_EOF({ position: pos, length: this._length });
        }

        return prevPos;
    }
}
