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

/**
 * The writer of a file, without buffer supports, in synchronous mode.
 */
export class SyncFileWriter extends AbstractSyncFileWriter implements IFileWriter {

    public constructor(
        fd: number,
        pos: number = 0,
    ) {

        super(fd, pos, 0);
    }

    /**
     * Create a new writer by opening a file with path.
     * @param path          The path of the file.
     * @param pos           The position where should the writer start at.
     * @param openMode      The mode of opening the file. [Default: 'w']
     */
    public static createFromPath(
        path: string,
        pos: number = 0,
        openMode: string = 'r+',
    ): IFileWriter {

        return new SyncFileWriter($FS.openSync(path, openMode), pos);
    }

    /**
     * Create a new writer using a file descriptor.
     *
     * @param fd            The file descriptor.
     * @param pos           The position where should the writer start at.
     */
    public static createFromFileDescriptor(
        fd: number,
        pos: number = 0,
    ): IFileWriter {

        return new SyncFileWriter(fd, pos);
    }

    public flush(): void {

        return;
    }

    protected _write(buf: Buffer, length: number): void {

        const bytesWritten = $FS.writeSync(this._fd, buf, 0, length, this._pos);

        if (bytesWritten !== length) {

            throw new E.E_NOT_WRITTEN_COMPLETELY({ bytesExpected: length, bytesWritten });
        }

        this._savePosition(length);
    }

    public seek(newPosition: number): number {

        const prevOffset = this._pos;

        this._pos = newPosition;

        return prevOffset;
    }
}
