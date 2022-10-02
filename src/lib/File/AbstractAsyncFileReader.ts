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
import { AbstractAsyncFileHelper } from './AbstractAsyncFileHelper';
import { IFileReader } from '../Common';
import * as E from '../Errors';

export abstract class AbstractAsyncFileReader extends AbstractAsyncFileHelper implements IFileReader<false> {

    protected _syncLock: boolean = false;

    private readonly _numBuffer: Buffer = Buffer.allocUnsafe(8);

    public constructor(
        protected _fd: $FS.FileHandle,
        size: number,
        pos: number,
        public readonly bufferSize: number,
    ) {

        super(size, pos);
    }

    public async readUIntSafeLE(): Promise<number> {

        if (this._syncLock) {

            throw new E.E_IO_BUSY();
        }

        this._syncLock = true;

        try {
            const buf = await this._read(this._numBuffer, 8, false);

            const highDWord = buf.readUInt32LE(4);

            if (highDWord > 0x1FFFFF) {

                throw new E.E_NOT_SAFE_INTEGER({ position: this._pos - 8 });
            }

            const lowDWord = buf.readUInt32LE();

            return lowDWord + highDWord * 4294967296;
        }
        finally {

            this._syncLock = false;
        }
    }

    public async readBuffer(length: number, _copy?: boolean, buffer?: Buffer): Promise<Buffer> {

        buffer ??= Buffer.allocUnsafe(length);

        return this._read(buffer, length);
    }

    protected abstract _read(buf: Buffer, length: number, copy?: boolean): Promise<Buffer>;

    public async readUInt8(): Promise<number> {

        if (this._syncLock) {

            throw new E.E_IO_BUSY();
        }

        this._syncLock = true;

        try {

            const ret = (await this._read(this._numBuffer, 1, false)).readUInt8();

            return ret;
        }
        finally {

            this._syncLock = false;
        }
    }

    public async readFloatLE(): Promise<number> {

        if (this._syncLock) {

            throw new E.E_IO_BUSY();
        }

        this._syncLock = true;

        try {

            const ret = (await this._read(this._numBuffer, 4, false)).readFloatLE();

            return ret;
        }
        finally {

            this._syncLock = false;
        }
    }

    public async readFloatBE(): Promise<number> {

        if (this._syncLock) {

            throw new E.E_IO_BUSY();
        }

        this._syncLock = true;

        try {

            const ret = (await this._read(this._numBuffer, 4, false)).readFloatBE();

            return ret;
        }
        finally {

            this._syncLock = false;
        }
    }

    public async readDoubleLE(): Promise<number> {

        if (this._syncLock) {

            throw new E.E_IO_BUSY();
        }

        this._syncLock = true;

        try {

            const ret = (await this._read(this._numBuffer, 8, false)).readDoubleLE();

            return ret;
        }
        finally {

            this._syncLock = false;
        }
    }

    public async readDoubleBE(): Promise<number> {

        if (this._syncLock) {

            throw new E.E_IO_BUSY();
        }

        this._syncLock = true;

        try {

            const ret = (await this._read(this._numBuffer, 8, false)).readDoubleBE();

            return ret;
        }
        finally {

            this._syncLock = false;
        }
    }

    public async readUInt16LE(): Promise<number> {

        if (this._syncLock) {

            throw new E.E_IO_BUSY();
        }

        this._syncLock = true;

        try {

            const ret = (await this._read(this._numBuffer, 2, false)).readUInt16LE();

            return ret;
        }
        finally {

            this._syncLock = false;
        }
    }

    public async readUInt16BE(): Promise<number> {

        if (this._syncLock) {

            throw new E.E_IO_BUSY();
        }

        this._syncLock = true;

        try {

            const ret = (await this._read(this._numBuffer, 2, false)).readUInt16BE();

            return ret;
        }
        finally {

            this._syncLock = false;
        }
    }

    public async readUInt32LE(): Promise<number> {

        if (this._syncLock) {

            throw new E.E_IO_BUSY();
        }

        this._syncLock = true;

        try {

            const ret = (await this._read(this._numBuffer, 4, false)).readUInt32LE();

            return ret;
        }
        finally {

            this._syncLock = false;
        }
    }

    public async readUInt32BE(): Promise<number> {

        if (this._syncLock) {

            throw new E.E_IO_BUSY();
        }

        this._syncLock = true;

        try {

            const ret = (await this._read(this._numBuffer, 4, false)).readUInt32BE();

            return ret;
        }
        finally {

            this._syncLock = false;
        }
    }

    public async readUInt64LE(): Promise<bigint> {

        if (this._syncLock) {

            throw new E.E_IO_BUSY();
        }

        this._syncLock = true;

        try {

            const ret = (await this._read(this._numBuffer, 8, false)).readBigUInt64LE();

            return ret;
        }
        finally {

            this._syncLock = false;
        }
    }

    public async readUInt64BE(): Promise<bigint> {

        if (this._syncLock) {

            throw new E.E_IO_BUSY();
        }

        this._syncLock = true;

        try {

            const ret = (await this._read(this._numBuffer, 8, false)).readBigUInt64BE();

            return ret;
        }
        finally {

            this._syncLock = false;
        }
    }

    public async readInt8(): Promise<number> {

        if (this._syncLock) {

            throw new E.E_IO_BUSY();
        }

        this._syncLock = true;

        try {

            const ret = (await this._read(this._numBuffer, 1, false)).readInt8();

            return ret;
        }
        finally {

            this._syncLock = false;
        }
    }

    public async readInt16LE(): Promise<number> {

        if (this._syncLock) {

            throw new E.E_IO_BUSY();
        }

        this._syncLock = true;

        try {

            const ret = (await this._read(this._numBuffer, 2, false)).readInt16LE();

            return ret;
        }
        finally {

            this._syncLock = false;
        }
    }

    public async readInt16BE(): Promise<number> {

        if (this._syncLock) {

            throw new E.E_IO_BUSY();
        }

        this._syncLock = true;

        try {

            const ret = (await this._read(this._numBuffer, 2, false)).readInt16BE();

            return ret;
        }
        finally {

            this._syncLock = false;
        }
    }

    public async readInt32LE(): Promise<number> {

        if (this._syncLock) {

            throw new E.E_IO_BUSY();
        }

        this._syncLock = true;

        try {

            const ret = (await this._read(this._numBuffer, 4, false)).readInt32LE();

            return ret;
        }
        finally {

            this._syncLock = false;
        }
    }

    public async readInt32BE(): Promise<number> {

        if (this._syncLock) {

            throw new E.E_IO_BUSY();
        }

        this._syncLock = true;

        try {

            const ret = (await this._read(this._numBuffer, 4, false)).readInt32BE();

            return ret;
        }
        finally {

            this._syncLock = false;
        }
    }

    public async readInt64LE(): Promise<bigint> {

        if (this._syncLock) {

            throw new E.E_IO_BUSY();
        }

        this._syncLock = true;

        try {

            const ret = (await this._read(this._numBuffer, 8, false)).readBigInt64LE();

            return ret;
        }
        finally {

            this._syncLock = false;
        }
    }

    public async readInt64BE(): Promise<bigint> {

        if (this._syncLock) {

            throw new E.E_IO_BUSY();
        }

        this._syncLock = true;

        try {

            const ret = (await this._read(this._numBuffer, 8, false)).readBigInt64BE();

            return ret;
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

            await this._fd.close();
        }
        finally {

            this._syncLock = false;
        }
    }
}
