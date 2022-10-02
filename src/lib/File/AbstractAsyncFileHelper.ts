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

import * as E from '../Errors';

export abstract class AbstractAsyncFileHelper {

    protected _syncLock: boolean = false;

    public constructor(
        protected _length: number,
        protected _pos: number = 0,
    ) {

    }

    protected async _lock<T>(callback: () => Promise<T>): Promise<T> {

        if (this._syncLock) {

            throw new E.E_IO_BUSY();
        }

        this._syncLock = true;

        try {
            return await callback();
        }
        finally {

            this._syncLock = false;
        }
    }

    public get length(): number {

        return this._length;
    }

    public get position(): number {

        return this._pos;
    }

    public seek(newPosition: number): Promise<number> {

        if (newPosition > this._length) {

            throw new E.E_EOF({ position: newPosition, length: 0 });
        }

        const prevOffset = this._pos;

        this._pos = newPosition;

        return Promise.resolve(prevOffset);
    }

    public seekDulta(dultaOffset: number): Promise<number> {

        return this.seek(this._pos + dultaOffset);
    }

}
