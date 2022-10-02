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

export type IAsyncAuto<T, TSync extends boolean> = TSync extends false ? Promise<T> : T;

export interface IBinaryHelper<TSync extends boolean> {

    /**
     * The current position to write next data.
     */
    readonly position: number;

    /**
     * The current length of buffer to be written in.
     */
    readonly length: number;

    /**
     * Move the position to a new positon.
     *
     * @param newPos    The given new position.
     *
     * @returns The previous position.
     */
    seek(newPos: number): IAsyncAuto<number, TSync>;

    /**
     * Move position forward by dulta.
     *
     * @param posDulta  The dulta to make movement.
     *
     * @returns The previous position.
     */
    seekDulta(posDulta: number): IAsyncAuto<number, TSync>;
}

export interface IBinaryReader<TSync extends boolean = true> extends IBinaryHelper<TSync> {

    /**
     * Read a determined-length buffer  at current position
     *
     * @param length    The length of buffer to read, in bytes.
     * @param copy      Copy from the buffer or not.
     * @param buffer    A given buffer to write data into.
     */
    readBuffer(length: number, copy?: boolean, buffer?: Buffer): IAsyncAuto<Buffer, TSync>;

    /**
     * Read a 8-bit unsigned integer at current position
     */
    readUInt8(): IAsyncAuto<number, TSync>;

    /**
     * Read a 16-bit unsigned integer in little-endian at current position
     */
    readUInt16LE(): IAsyncAuto<number, TSync>;

    /**
     * Read a 16-bit unsigned integer in big-endian at current position
     */
    readUInt16BE(): IAsyncAuto<number, TSync>;

    /**
     * Read a 32-bit unsigned integer in little-endian at current position
     */
    readUInt32LE(): IAsyncAuto<number, TSync>;

    /**
     * Read a 32-bit unsigned integer in big-endian at current position
     */
    readUInt32BE(): IAsyncAuto<number, TSync>;

    /**
     * Read a 64-bit unsigned integer in little-endian at current position
     */
    readUInt64LE(): IAsyncAuto<bigint, TSync>;

    /**
     * Read a 64-bit unsigned integer in big-endian at current position
     */
    readUInt64BE(): IAsyncAuto<bigint, TSync>;

    /**
     * Read a 64-bit unsigned integer in little-endian at current position, as ECMAScript safe integer (53-bit).
     */
    readUIntSafeLE(): IAsyncAuto<number, TSync>;

    /**
     * Read a 8-bit signed integer at current position
     */
    readInt8(): IAsyncAuto<number, TSync>;

    /**
     * Read a 16-bit signed integer in little-endian at current position
     */
    readInt16LE(): IAsyncAuto<number, TSync>;

    /**
     * Read a 16-bit signed integer in big-endian at current position
     */
    readInt16BE(): IAsyncAuto<number, TSync>;

    /**
     * Read a 32-bit signed integer in little-endian at current position
     */
    readInt32LE(): IAsyncAuto<number, TSync>;

    /**
     * Read a 32-bit signed integer in big-endian at current position
     */
    readInt32BE(): IAsyncAuto<number, TSync>;

    /**
     * Read a 64-bit signed integer in little-endian at current position
     */
    readInt64LE(): IAsyncAuto<bigint, TSync>;

    /**
     * Read a 64-bit signed integer in big-endian at current position
     */
    readInt64BE(): IAsyncAuto<bigint, TSync>;

    /**
     * Read a single-precision floating value in little-endian at current position
     */
    readFloatLE(): IAsyncAuto<number, TSync>;

    /**
     * Read a single-precision floating value in big-endian at current position
     */
    readFloatBE(): IAsyncAuto<number, TSync>;

    /**
     * Read a double-precision floating value in little-endian at current position
     */
    readDoubleLE(): IAsyncAuto<number, TSync>;

    /**
     * Read a double-precision floating value in big-endian at current position
     */
    readDoubleBE(): IAsyncAuto<number, TSync>;
}

export interface IBinaryWriter<TSync extends boolean = true> extends IBinaryHelper<TSync> {

    /**
     * Copy a buffer into current position.
     *
     * @param buf   The buffer should be copied from.
     */
    writeBuffer(buf: Buffer): IAsyncAuto<void, TSync>;

    /**
     * Write a 8-bit unsigned integer at current position
     *
     * @param data  The value to write.
     */
    writeUInt8(data: number): IAsyncAuto<void, TSync>;

    /**
     * Write a 16-bit unsigned integer in little-endian at current position
     *
     * @param data  The value to write.
     */
    writeUInt16LE(data: number): IAsyncAuto<void, TSync>;

    /**
     * Write a 16-bit unsigned integer in big-endian at current position
     *
     * @param data  The value to write.
     */
    writeUInt16BE(data: number): IAsyncAuto<void, TSync>;

    /**
     * Write a 32-bit unsigned integer in little-endian at current position
     *
     * @param data  The value to write.
     */
    writeUInt32LE(data: number): IAsyncAuto<void, TSync>;

    /**
     * Write a 32-bit unsigned integer in big-endian at current position
     *
     * @param data  The value to write.
     */
    writeUInt32BE(data: number): IAsyncAuto<void, TSync>;

    /**
     * Write a 64-bit unsigned integer in little-endian at current position
     *
     * @param data  The value to write.
     */
    writeUInt64LE(data: number | bigint): IAsyncAuto<void, TSync>;

    /**
     * Write a 64-bit unsigned integer in big-endian at current position
     *
     * @param data  The value to write.
     */
    writeUInt64BE(data: number | bigint): IAsyncAuto<void, TSync>;

    /**
     * Write a 8-bit signed integer at current position
     *
     * @param data  The value to write.
     */
    writeInt8(data: number): IAsyncAuto<void, TSync>;

    /**
     * Write a 16-bit signed integer in little-endian at current position
     *
     * @param data  The value to write.
     */
    writeInt16LE(data: number): IAsyncAuto<void, TSync>;

    /**
     * Write a 16-bit signed integer in big-endian at current position
     *
     * @param data  The value to write.
     */
    writeInt16BE(data: number): IAsyncAuto<void, TSync>;

    /**
     * Write a 32-bit signed integer in little-endian at current position
     *
     * @param data  The value to write.
     */
    writeInt32LE(data: number): IAsyncAuto<void, TSync>;

    /**
     * Write a 32-bit signed integer in big-endian at current position
     *
     * @param data  The value to write.
     */
    writeInt32BE(data: number): IAsyncAuto<void, TSync>;

    /**
     * Write a 64-bit signed integer in little-endian at current position
     *
     * @param data  The value to write.
     */
    writeInt64LE(data: number | bigint): IAsyncAuto<void, TSync>;

    /**
     * Write a 64-bit signed integer in big-endian at current position
     *
     * @param data  The value to write.
     */
    writeInt64BE(data: number | bigint): IAsyncAuto<void, TSync>;

    /**
     * Write a 64-bit double-precision floating value in little-endian at current position
     *
     * @param data  The value to write.
     */
    writeDoubleLE(data: number | bigint): IAsyncAuto<void, TSync>;

    /**
     * Write a 64-bit double-precision floating value in big-endian at current position
     *
     * @param data  The value to write.
     */
    writeDoubleBE(data: number | bigint): IAsyncAuto<void, TSync>;

    /**
     * Write a 32-bit single-precision floating value in little-endian at current position
     *
     * @param data  The value to write.
     */
    writeFloatLE(data: number | bigint): IAsyncAuto<void, TSync>;

    /**
     * Write a 32-bit single-precision floating value in big-endian at current position
     *
     * @param data  The value to write.
     */
    writeFloatBE(data: number | bigint): IAsyncAuto<void, TSync>;
}

export interface IBufferWriter extends IBinaryWriter {

    /**
     * How many bytes should be allocated while extending buffer size automatically.
     */
    autoAllocateSize: number;

    /**
     * Get the buffer from begin to current positon.
     *
     * @returns The truncated buffer.
     */
    truncate(): Buffer;

    /**
     * Extends the current writing-buffer
     *
     * @param length how many bytes should be extended.
     */
    allocate(length: number): void;
}

export interface IFileWriter<TSync extends boolean = true> extends IBinaryWriter<TSync> {

    /**
     * The size of buffer for improving writing, in bytes.
     *
     * @type uint32
     */
    readonly bufferSize: number;

    /**
     * Write data in buffer into file.
     */
    flush(): IAsyncAuto<void, TSync>;

    close(): IAsyncAuto<void, TSync>;
}

export interface IFileReader<TSync extends boolean = true> extends IBinaryReader<TSync> {

    /**
     * The size of buffer for improving writing, in bytes.
     *
     * @type uint32
     */
    readonly bufferSize: number;

    close(): IAsyncAuto<void, TSync>;
}
