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

/**
 * The writer of a file, without buffer supports, in synchronous mode.
 */
export class AsyncFileReader extends AbstractAsyncFileReader implements IFileReader<false> {

    public readonly bufferSize: number = 0;

    public constructor(
        fd: $FS.FileHandle,
        size: number,
        pos: number = 0
    ) {

        super(fd, size, pos, 0);
    }

    public static async createFromPath(path: string, pos: number = 0): Promise<IFileReader<false>> {

        const fd = await $FS.open(path, 'r');

        return new AsyncFileReader(fd, (await fd.stat()).size, pos);
    }

    public static async createFromFileDescriptor(
        fd: $FS.FileHandle,
        pos: number = 0
    ): Promise<IFileReader<false>> {

        return new AsyncFileReader(fd, (await fd.stat()).size, pos);
    }

    public flush(): Promise<void> {

        return VOID_RESOLVED_PROMISE;
    }

    protected async _read(buf: Buffer, length: number): Promise<Buffer> {

        if (this._pos + length > this._length) {

            throw new E.E_EOF({ position: this._pos, length });
        }

        await this._fd.read(buf, 0, length, this._pos);

        this._pos += length;

        return buf;
    }

    public seek(newPosition: number): Promise<number> {

        const prevOffset = this._pos;

        this._pos = newPosition;

        return Promise.resolve(prevOffset);
    }
}
