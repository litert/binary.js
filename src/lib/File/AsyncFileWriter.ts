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
import * as E from '../Errors';
import { AbstractAsyncFileWriter } from './AbstractAsyncFileWriter';

const VOID_RESOLVED_PROMISE = Promise.resolve();

/**
 * The writer of a file, without buffer supports, in synchronous mode.
 */
export class AsyncFileWriter extends AbstractAsyncFileWriter implements IFileWriter<false> {

    public readonly bufferSize: number = 0;

    public constructor(
        fd: $FS.FileHandle,
        size: number,
        pos: number = 0,
    ) {

        super(fd, size, pos);
    }

    public static async createFromPath(path: string, pos: number = 0): Promise<IFileWriter<false>> {

        const fd = await $FS.open(path, 'w');

        return new AsyncFileWriter(fd, (await fd.stat()).size, pos);
    }

    public static async createFromFileDescriptor(
        fd: $FS.FileHandle,
        pos: number = 0
    ): Promise<IFileWriter<false>> {

        return new AsyncFileWriter(fd, (await fd.stat()).size, pos);
    }

    public flush(): Promise<void> {

        return VOID_RESOLVED_PROMISE;
    }

    protected async _write(buf: Buffer, length: number): Promise<void> {

        const { bytesWritten } = await this._fd.write(buf, 0, length, this._pos);

        if (bytesWritten !== length) {

            throw new E.E_NOT_WRITTEN_COMPLETELY({ bytesExpected: length, bytesWritten });
        }

        this._savePosition(length);
    }

    public seek(newPosition: number): Promise<number> {

        const prevOffset = this._pos;

        this._pos = newPosition;

        return Promise.resolve(prevOffset);
    }
}
