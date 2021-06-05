/**
 * Copyright 2021 Angus.Fenying <fenying@litert.org>
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

export type IAsyncAuto<T, TSync extends boolean> = TSync extends false ? Promise<T> : T;

export interface IBinaryReader<TSync extends boolean = true> {

    readonly position: number;

    readonly length: number;

    /**
     * Move to determined position.
     *
     * @param newPos    The new position
     */
    seek(newPos: number): number;

    /**
     * Move position forward by dulta.
     *
     * @param posDulta  The dulta to be moved
     */
    seekDulta(posDulta: number): number;

    readBuffer(length: number, copy?: boolean): IAsyncAuto<Buffer, TSync>;

    readUInt8(): IAsyncAuto<number, TSync>;

    readUInt16LE(): IAsyncAuto<number, TSync>;

    readUInt16BE(): IAsyncAuto<number, TSync>;

    readUInt32LE(): IAsyncAuto<number, TSync>;

    readUInt32BE(): IAsyncAuto<number, TSync>;

    readUInt64LE(): IAsyncAuto<bigint, TSync>;

    readUInt64BE(): IAsyncAuto<bigint, TSync>;

    readUIntSafeLE(): IAsyncAuto<number, TSync>;

    readInt8(): IAsyncAuto<number, TSync>;

    readInt16LE(): IAsyncAuto<number, TSync>;

    readInt16BE(): IAsyncAuto<number, TSync>;

    readInt32LE(): IAsyncAuto<number, TSync>;

    readInt32BE(): IAsyncAuto<number, TSync>;

    readInt64LE(): IAsyncAuto<bigint, TSync>;

    readInt64BE(): IAsyncAuto<bigint, TSync>;

    readFloatLE(): IAsyncAuto<number, TSync>;

    readFloatBE(): IAsyncAuto<number, TSync>;

    readDoubleLE(): IAsyncAuto<number, TSync>;

    readDoubleBE(): IAsyncAuto<number, TSync>;
}

export interface IBinaryWriter<TSync extends boolean = true> {

    readonly position: number;

    readonly length: number;

    seek(newPos: number): number;

    /**
     * Move position forward by dulta.
     *
     * @param posDulta  The dulta to be moved
     */
    seekDulta(posDulta: number): number;

    writeBuffer(buf: Buffer): IAsyncAuto<void, TSync>;

    writeUInt8(data: number): IAsyncAuto<void, TSync>;

    writeUInt16LE(data: number): IAsyncAuto<void, TSync>;

    writeUInt16BE(data: number): IAsyncAuto<void, TSync>;

    writeUInt32LE(data: number): IAsyncAuto<void, TSync>;

    writeUInt32BE(data: number): IAsyncAuto<void, TSync>;

    writeUInt64LE(data: number | bigint): IAsyncAuto<void, TSync>;

    writeUInt64BE(data: number | bigint): IAsyncAuto<void, TSync>;

    writeInt8(data: number): IAsyncAuto<void, TSync>;

    writeInt16LE(data: number): IAsyncAuto<void, TSync>;

    writeInt16BE(data: number): IAsyncAuto<void, TSync>;

    writeInt32LE(data: number): IAsyncAuto<void, TSync>;

    writeInt32BE(data: number): IAsyncAuto<void, TSync>;

    writeInt64LE(data: number | bigint): IAsyncAuto<void, TSync>;

    writeInt64BE(data: number | bigint): IAsyncAuto<void, TSync>;
}

export interface IBufferWriter extends IBinaryWriter {

    truncate(): Buffer;

    allocate(length: number): void;
}
