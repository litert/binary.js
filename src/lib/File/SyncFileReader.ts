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
import { IFileReader } from '../Common';
import * as E from '../Errors';
import { AbstractSyncFileReader } from './AbstractSyncFileReader';

export class SyncFileReader extends AbstractSyncFileReader {

    /**
     * Create a new reader by opening a file with path.
     * @param path          The path of the file.
     * @param pos           The position where should the reader start at.
     * @param openMode      The mode of opening the file. [Default: 'w']
     */
    public static createFromPath(
        path: string,
        pos: number = 0,
        openMode: string = 'r',
    ): IFileReader {

        return new SyncFileReader($FS.openSync(path, openMode), pos, 0);
    }

    /**
     * Create a new reader using a file descriptor.
     *
     * @param fd            The file descriptor.
     * @param pos           The position where should the reader start at.
     */
    public static createFromFileDescriptor(
        fd: number,
        pos: number = 0,
    ): IFileReader {

        return new SyncFileReader(fd, pos, 0);
    }

    protected _read(buf: Buffer, length: number): Buffer {

        if (this._pos + length > this._length) {

            throw new E.E_EOF({ position: this._pos, length });
        }

        $FS.readSync(this._fd, buf, 0, length, this._pos);

        this._pos += length;

        return buf;
    }
}
