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
import { IFileWriter } from '../Common';
import * as E from '../Errors';
import { AbstractSyncFileWriter } from './AbstractSyncFileWriter';

const DEFAULT_BUFFER_SIZE = 4096;

/**
 * The writer of a file, with buffer supports, in synchronous mode.
 */
export class SyncFileBufferWriter extends AbstractSyncFileWriter implements IFileWriter {

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
        fd: number,
        pos: number = 0,
        bufferSize: number = DEFAULT_BUFFER_SIZE
    ) {

        super(fd, pos, bufferSize);

        this._buffer = Buffer.allocUnsafe(bufferSize);
        this._bufferStartAt = pos;
    }

    /**
     * Create a new writer by opening a file with path.
     * @param path          The path of the file.
     * @param pos           The position where should the writer start at.
     * @param bufferSize    The size of the buffer.
     * @param openMode      The mode of opening the file. [Default: 'w']
     */
    public static createFromPath(
        path: string,
        pos: number = 0,
        bufferSize: number = DEFAULT_BUFFER_SIZE,
        openMode: string = 'w',
    ): IFileWriter {

        return new SyncFileBufferWriter($FS.openSync(path, openMode), pos, bufferSize);
    }

    /**
     * Create a new writer using a file descriptor.
     *
     * @param fd            The file descriptor.
     * @param pos           The position where should the writer start at.
     * @param bufferSize    The size of the buffer.
     */
    public static createFromFileDescriptor(
        fd: number,
        pos: number = 0,
        bufferSize: number = DEFAULT_BUFFER_SIZE,
    ): IFileWriter {

        return new SyncFileBufferWriter(fd, pos, bufferSize);
    }

    public flush(): void {

        if (!this._bufferedSize) {

            return;
        }

        const bytesWritten = $FS.writeSync(this._fd, this._buffer, 0, this._bufferedSize, this._bufferStartAt);

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

    protected _write(buf: Buffer, length: number): void {

        if (this._isBufferable(length)) {

            buf.copy(this._buffer, this._bufferedSize, 0, length);

            this._bufferedSize += length;

            this._savePosition(length);
        }
        else {

            this.flush();

            const bytesWritten = $FS.writeSync(this._fd, buf, 0, length, this._pos);

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

    public seek(newPosition: number): number {

        this.flush();

        const prevOffset = this._pos;

        this._pos = newPosition;

        return prevOffset;
    }
}
