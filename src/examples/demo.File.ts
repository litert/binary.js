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

import * as $Binary from '../lib';

import * as $FS from 'fs';

function randInt(min: number, max: number): number {

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createArray<T>(qty: number, map: (idx: number) => T): T[] {

    const arr = new Array(qty);

    for (let i = 0; i < qty; i++) {

        arr[i] = map(i);
    }

    return arr;
}

const UINT8_DATA = createArray(16, () => randInt(0, 255));
const INT8_DATA = createArray(16, () => randInt(-128, 127));
const UINT16_DATA = createArray(16, () => randInt(0, 65535));
const INT16_DATA = createArray(16, () => randInt(-32768, 32767));
const UINT32_DATA = createArray(16, () => randInt(0, 4294967295));
const INT32_DATA = createArray(16, () => randInt(-2147483648, 2147483647));
const UINT64_DATA = createArray(16, () => randInt(0, 42949672950));
const INT64_DATA = createArray(16, () => randInt(-21474836480, 21474836470));
const FLOAT32_DATA = createArray(16, () => parseFloat((Math.random() * 1000).toFixed(3)));
const DOUBLE64_DATA = createArray(16, () => parseFloat((Math.random() * 100000).toFixed(5)));
const BUFFER_DATA = createArray(
    16,
    () => Buffer.from(createArray(
        randInt(1, 1024 * 64),
        () => randInt(0, 255)
    ))
);

const TEST_DIR = './data';
const TEST_FILE_1 = `${TEST_DIR}/test1.bin`;
const TEST_FILE_2 = `${TEST_DIR}/test2.bin`;
const TEST_FILE_3 = `${TEST_DIR}/test3.bin`;
const TEST_FILE_4 = `${TEST_DIR}/test4.bin`;

function writeFileWithSyncFileWriter(file: string): void {

    const fd = $FS.openSync(file, 'w');
    const w = new $Binary.SyncFileWriter(fd);

    for (const v of UINT8_DATA) {
        w.writeUInt8(v);
    }

    for (const v of INT8_DATA) {
        w.writeInt8(v);
    }

    for (const v of UINT16_DATA) {
        w.writeUInt16LE(v);
        w.writeUInt16BE(v);
    }

    for (const v of INT16_DATA) {
        w.writeInt16LE(v);
        w.writeInt16BE(v);
    }

    for (const v of UINT32_DATA) {
        w.writeUInt32LE(v);
        w.writeUInt32BE(v);
    }

    for (const v of INT32_DATA) {
        w.writeInt32LE(v);
        w.writeInt32BE(v);
    }

    for (const v of UINT64_DATA) {
        w.writeUInt64LE(v);
        w.writeUInt64BE(v);
    }

    for (const v of INT64_DATA) {
        w.writeInt64LE(v);
        w.writeInt64BE(v);
    }

    for (const v of FLOAT32_DATA) {
        w.writeFloatLE(v);
        w.writeFloatBE(v);
    }

    for (const v of DOUBLE64_DATA) {
        w.writeDoubleLE(v);
        w.writeDoubleBE(v);
    }

    w.seek(10 * 1024 * 1024);

    for (const v of BUFFER_DATA) {
        w.writeBuffer(v);
    }

    $FS.closeSync(fd);
}

function writeFileWithSyncFileBufferWriter(file: string): void {

    const fd = $FS.openSync(file, 'w');
    const w = new $Binary.SyncFileBufferWriter(fd);

    for (const v of UINT8_DATA) {
        w.writeUInt8(v);
    }

    for (const v of INT8_DATA) {
        w.writeInt8(v);
    }

    for (const v of UINT16_DATA) {
        w.writeUInt16LE(v);
        w.writeUInt16BE(v);
    }

    for (const v of INT16_DATA) {
        w.writeInt16LE(v);
        w.writeInt16BE(v);
    }

    for (const v of UINT32_DATA) {
        w.writeUInt32LE(v);
        w.writeUInt32BE(v);
    }

    for (const v of INT32_DATA) {
        w.writeInt32LE(v);
        w.writeInt32BE(v);
    }

    for (const v of UINT64_DATA) {
        w.writeUInt64LE(v);
        w.writeUInt64BE(v);
    }

    for (const v of INT64_DATA) {
        w.writeInt64LE(v);
        w.writeInt64BE(v);
    }

    for (const v of FLOAT32_DATA) {
        w.writeFloatLE(v);
        w.writeFloatBE(v);
    }

    for (const v of DOUBLE64_DATA) {
        w.writeDoubleLE(v);
        w.writeDoubleBE(v);
    }

    w.seek(10 * 1024 * 1024);

    for (const v of BUFFER_DATA) {
        w.writeBuffer(v);
    }

    w.flush();

    $FS.closeSync(fd);
}

async function writeFileWithAsyncFileWriter(file: string): Promise<void> {

    const w = await $Binary.AsyncFileWriter.createFromPath(file);

    for (const v of UINT8_DATA) {
        await w.writeUInt8(v);
    }

    for (const v of INT8_DATA) {
        await w.writeInt8(v);
    }

    for (const v of UINT16_DATA) {
        await w.writeUInt16LE(v);
        await w.writeUInt16BE(v);
    }

    for (const v of INT16_DATA) {
        await w.writeInt16LE(v);
        await w.writeInt16BE(v);
    }

    for (const v of UINT32_DATA) {
        await w.writeUInt32LE(v);
        await w.writeUInt32BE(v);
    }

    for (const v of INT32_DATA) {
        await w.writeInt32LE(v);
        await w.writeInt32BE(v);
    }

    for (const v of UINT64_DATA) {
        await w.writeUInt64LE(v);
        await w.writeUInt64BE(v);
    }

    for (const v of INT64_DATA) {
        await w.writeInt64LE(v);
        await w.writeInt64BE(v);
    }

    for (const v of FLOAT32_DATA) {
        await w.writeFloatLE(v);
        await w.writeFloatBE(v);
    }

    for (const v of DOUBLE64_DATA) {
        await w.writeDoubleLE(v);
        await w.writeDoubleBE(v);
    }

    await w.seek(10 * 1024 * 1024);

    for (const v of BUFFER_DATA) {
        await w.writeBuffer(v);
    }

    await w.close();
}

async function writeFileWithAsyncFileBufferWriter(file: string): Promise<void> {

    const w = await $Binary.AsyncFileBufferWriter.createFromPath(file, 0, 128);

    for (const v of UINT8_DATA) {
        await w.writeUInt8(v);
    }

    for (const v of INT8_DATA) {
        await w.writeInt8(v);
    }

    for (const v of UINT16_DATA) {
        await w.writeUInt16LE(v);
        await w.writeUInt16BE(v);
    }

    for (const v of INT16_DATA) {
        await w.writeInt16LE(v);
        await w.writeInt16BE(v);
    }

    for (const v of UINT32_DATA) {
        await w.writeUInt32LE(v);
        await w.writeUInt32BE(v);
    }

    for (const v of INT32_DATA) {
        await w.writeInt32LE(v);
        await w.writeInt32BE(v);
    }

    for (const v of UINT64_DATA) {
        await w.writeUInt64LE(v);
        await w.writeUInt64BE(v);
    }

    for (const v of INT64_DATA) {
        await w.writeInt64LE(v);
        await w.writeInt64BE(v);
    }

    for (const v of FLOAT32_DATA) {
        await w.writeFloatLE(v);
        await w.writeFloatBE(v);
    }

    for (const v of DOUBLE64_DATA) {
        await w.writeDoubleLE(v);
        await w.writeDoubleBE(v);
    }

    await w.seek(10 * 1024 * 1024);

    for (const v of BUFFER_DATA) {
        await w.writeBuffer(v);
    }

    await w.close();
}

function readFileWithSyncFileBufferReader(prefix: string, file: string): void {

    const reader = $Binary.SyncFileBufferReader.createFromPath(file);

    console.log(prefix, 'Reading UINT8_DATA...');

    for (const v of UINT8_DATA) {

        console.assert(reader.readUInt8() === v);
    }

    console.log(prefix, 'Reading INT8_DATA...');

    for (const v of INT8_DATA) {

        console.assert(reader.readInt8() === v);
    }

    console.log(prefix, 'Reading UINT16_DATA...');

    for (const v of UINT16_DATA) {

        console.assert(reader.readUInt16LE() === v);
        console.assert(reader.readUInt16BE() === v);
    }

    console.log(prefix, 'Reading INT16_DATA...');

    for (const v of INT16_DATA) {

        console.assert(reader.readInt16LE() === v);
        console.assert(reader.readInt16BE() === v);
    }

    console.log(prefix, 'Reading UINT32_DATA...');

    for (const v of UINT32_DATA) {

        console.assert(reader.readUInt32LE() === v);
        console.assert(reader.readUInt32BE() === v);
    }

    console.log(prefix, 'Reading INT32_DATA...');

    for (const v of INT32_DATA) {

        console.assert(reader.readInt32LE() === v);
        console.assert(reader.readInt32BE() === v);
    }

    console.log(prefix, 'Reading UINT64_DATA...');

    for (const v of UINT64_DATA) {

        const V = BigInt(v);
        const l = Math.random() < 0.5 ? reader.readUIntSafeLE() : reader.readUInt64LE();
        const b = reader.readUInt64BE();
        console.assert(BigInt(l) === V);
        console.assert(b === V);
    }

    console.log(prefix, 'Reading INT64_DATA...');

    for (const v of INT64_DATA) {

        console.assert(reader.readInt64LE() === BigInt(v));
        console.assert(reader.readInt64BE() === BigInt(v));
    }

    console.log(prefix, 'Reading FLOAT32_DATA...');

    for (const v of FLOAT32_DATA) {

        const l = parseFloat(reader.readFloatLE().toFixed(3));
        const b = parseFloat(reader.readFloatBE().toFixed(3));
        console.assert(l === v);
        console.assert(b === v);
    }

    console.log(prefix, 'Reading DOUBLE64_DATA...');

    for (const v of DOUBLE64_DATA) {

        console.assert(reader.readDoubleLE() === v);
        console.assert(reader.readDoubleBE() === v);
    }

    console.log(prefix, 'Seeking to 10MB offset...');

    reader.seek(10 * 1024 * 1024);

    console.log(prefix, 'Reading BUFFER_DATA...');

    for (const v of BUFFER_DATA) {

        const b = reader.readBuffer(v.byteLength);

        console.assert(b.compare(v) === 0);
    }

    reader.close();
}

async function readFileWithAsyncFileBufferReader(prefix: string, file: string): Promise<void> {

    const reader = await $Binary.AsyncFileBufferReader.createFromPath(file);

    console.log(prefix, 'Reading UINT8_DATA...');

    for (const v of UINT8_DATA) {

        console.assert(await reader.readUInt8() === v);
    }

    console.log(prefix, 'Reading INT8_DATA...');

    for (const v of INT8_DATA) {

        console.assert(await reader.readInt8() === v);
    }

    console.log(prefix, 'Reading UINT16_DATA...');

    for (const v of UINT16_DATA) {

        console.assert(await reader.readUInt16LE() === v);
        console.assert(await reader.readUInt16BE() === v);
    }

    console.log(prefix, 'Reading INT16_DATA...');

    for (const v of INT16_DATA) {

        console.assert(await reader.readInt16LE() === v);
        console.assert(await reader.readInt16BE() === v);
    }

    console.log(prefix, 'Reading UINT32_DATA...');

    for (const v of UINT32_DATA) {

        console.assert(await reader.readUInt32LE() === v);
        console.assert(await reader.readUInt32BE() === v);
    }

    console.log(prefix, 'Reading INT32_DATA...');

    for (const v of INT32_DATA) {

        console.assert(await reader.readInt32LE() === v);
        console.assert(await reader.readInt32BE() === v);
    }

    console.log(prefix, 'Reading UINT64_DATA...');

    for (const v of UINT64_DATA) {

        const V = BigInt(v);
        const l = Math.random() < 0.5 ? await reader.readUIntSafeLE() : await reader.readUInt64LE();
        const b = await reader.readUInt64BE();
        console.assert(BigInt(l) === V);
        console.assert(b === V);
    }

    console.log(prefix, 'Reading INT64_DATA...');

    for (const v of INT64_DATA) {

        console.assert(await reader.readInt64LE() === BigInt(v));
        console.assert(await reader.readInt64BE() === BigInt(v));
    }

    console.log(prefix, 'Reading FLOAT32_DATA...');

    for (const v of FLOAT32_DATA) {

        const l = parseFloat((await reader.readFloatLE()).toFixed(3));
        const b = parseFloat((await reader.readFloatBE()).toFixed(3));
        console.assert(l === v);
        console.assert(b === v);
    }

    console.log(prefix, 'Reading DOUBLE64_DATA...');

    for (const v of DOUBLE64_DATA) {

        console.assert(await reader.readDoubleLE() === v);
        console.assert(await reader.readDoubleBE() === v);
    }

    console.log(prefix, 'Seeking to 10MB offset...');

    await reader.seek(10 * 1024 * 1024);

    console.log(prefix, 'Reading BUFFER_DATA...');

    for (const v of BUFFER_DATA) {

        const b = await reader.readBuffer(v.byteLength);

        console.assert(b.compare(v) === 0);
    }

    await reader.close();
}

async function readFileWithAsyncFileReader(prefix: string, file: string): Promise<void> {

    const reader = await $Binary.AsyncFileReader.createFromPath(file);

    console.log(prefix, 'Reading UINT8_DATA...');

    for (const v of UINT8_DATA) {

        console.assert(await reader.readUInt8() === v);
    }

    console.log(prefix, 'Reading INT8_DATA...');

    for (const v of INT8_DATA) {

        console.assert(await reader.readInt8() === v);
    }

    console.log(prefix, 'Reading UINT16_DATA...');

    for (const v of UINT16_DATA) {

        console.assert(await reader.readUInt16LE() === v);
        console.assert(await reader.readUInt16BE() === v);
    }

    console.log(prefix, 'Reading INT16_DATA...');

    for (const v of INT16_DATA) {

        console.assert(await reader.readInt16LE() === v);
        console.assert(await reader.readInt16BE() === v);
    }

    console.log(prefix, 'Reading UINT32_DATA...');

    for (const v of UINT32_DATA) {

        console.assert(await reader.readUInt32LE() === v);
        console.assert(await reader.readUInt32BE() === v);
    }

    console.log(prefix, 'Reading INT32_DATA...');

    for (const v of INT32_DATA) {

        console.assert(await reader.readInt32LE() === v);
        console.assert(await reader.readInt32BE() === v);
    }

    console.log(prefix, 'Reading UINT64_DATA...');

    for (const v of UINT64_DATA) {

        const V = BigInt(v);
        const l = Math.random() < 0.5 ? await reader.readUIntSafeLE() : await reader.readUInt64LE();
        const b = await reader.readUInt64BE();
        console.assert(BigInt(l) === V);
        console.assert(b === V);
    }

    console.log(prefix, 'Reading INT64_DATA...');

    for (const v of INT64_DATA) {

        console.assert(await reader.readInt64LE() === BigInt(v));
        console.assert(await reader.readInt64BE() === BigInt(v));
    }

    console.log(prefix, 'Reading FLOAT32_DATA...');

    for (const v of FLOAT32_DATA) {

        const l = parseFloat((await reader.readFloatLE()).toFixed(3));
        const b = parseFloat((await reader.readFloatBE()).toFixed(3));
        console.assert(l === v);
        console.assert(b === v);
    }

    console.log(prefix, 'Reading DOUBLE64_DATA...');

    for (const v of DOUBLE64_DATA) {

        console.assert(await reader.readDoubleLE() === v);
        console.assert(await reader.readDoubleBE() === v);
    }

    console.log(prefix, 'Seeking to 10MB offset...');

    await reader.seek(10 * 1024 * 1024);

    console.log(prefix, 'Reading BUFFER_DATA...');

    for (const v of BUFFER_DATA) {

        const b = await reader.readBuffer(v.byteLength);

        console.assert(b.compare(v) === 0);
    }

    await reader.close();
}

function readFileWithSyncFileReader(prefix: string, file: string): void {

    const reader = $Binary.SyncFileReader.createFromPath(file, 0, 'r');

    console.log(prefix, 'Reading UINT8_DATA...');

    for (const v of UINT8_DATA) {

        console.assert(reader.readUInt8() === v);
    }

    console.log(prefix, 'Reading INT8_DATA...');

    for (const v of INT8_DATA) {

        console.assert(reader.readInt8() === v);
    }

    console.log(prefix, 'Reading UINT16_DATA...');

    for (const v of UINT16_DATA) {

        console.assert(reader.readUInt16LE() === v);
        console.assert(reader.readUInt16BE() === v);
    }

    console.log(prefix, 'Reading INT16_DATA...');

    for (const v of INT16_DATA) {

        console.assert(reader.readInt16LE() === v);
        console.assert(reader.readInt16BE() === v);
    }

    console.log(prefix, 'Reading UINT32_DATA...');

    for (const v of UINT32_DATA) {

        console.assert(reader.readUInt32LE() === v);
        console.assert(reader.readUInt32BE() === v);
    }

    console.log(prefix, 'Reading INT32_DATA...');

    for (const v of INT32_DATA) {

        console.assert(reader.readInt32LE() === v);
        console.assert(reader.readInt32BE() === v);
    }

    console.log(prefix, 'Reading UINT64_DATA...');

    for (const v of UINT64_DATA) {

        const V = BigInt(v);
        const l = Math.random() < 0.5 ? reader.readUIntSafeLE() : reader.readUInt64LE();
        const b = reader.readUInt64BE();
        console.assert(BigInt(l) === V);
        console.assert(b === V);
    }

    console.log(prefix, 'Reading INT64_DATA...');

    for (const v of INT64_DATA) {

        console.assert(reader.readInt64LE() === BigInt(v));
        console.assert(reader.readInt64BE() === BigInt(v));
    }

    console.log(prefix, 'Reading FLOAT32_DATA...');

    for (const v of FLOAT32_DATA) {

        const l = parseFloat(reader.readFloatLE().toFixed(3));
        const b = parseFloat(reader.readFloatBE().toFixed(3));
        console.assert(l === v);
        console.assert(b === v);
    }

    console.log(prefix, 'Reading DOUBLE64_DATA...');

    for (const v of DOUBLE64_DATA) {

        console.assert(reader.readDoubleLE() === v);
        console.assert(reader.readDoubleBE() === v);
    }

    console.log(prefix, 'Seeking to 10MB offset...');

    reader.seek(10 * 1024 * 1024);

    console.log(prefix, 'Reading BUFFER_DATA...');

    for (const v of BUFFER_DATA) {

        const b = reader.readBuffer(v.byteLength);

        console.assert(b.compare(v) === 0);
    }

    reader.close();
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {

    $FS.mkdirSync(TEST_DIR, { recursive: true });

    writeFileWithSyncFileWriter(TEST_FILE_1);
    readFileWithSyncFileReader('[W+R]', TEST_FILE_1);
    readFileWithSyncFileBufferReader('[W+Rb]', TEST_FILE_1);
    await readFileWithAsyncFileReader('[W+Ra]', TEST_FILE_1);
    await readFileWithAsyncFileBufferReader('[W+Rab]', TEST_FILE_1);

    writeFileWithSyncFileBufferWriter(TEST_FILE_2);
    readFileWithSyncFileReader('[Wb+R]', TEST_FILE_2);
    readFileWithSyncFileBufferReader('[Wb+Rb]', TEST_FILE_2);

    await writeFileWithAsyncFileWriter(TEST_FILE_3);
    readFileWithSyncFileReader('[Wa+R]', TEST_FILE_3);
    readFileWithSyncFileBufferReader('[Wa+Rb]', TEST_FILE_3);

    await writeFileWithAsyncFileBufferWriter(TEST_FILE_4);
    readFileWithSyncFileReader('[Wab+R]', TEST_FILE_4);
    readFileWithSyncFileBufferReader('[Wab+Rb]', TEST_FILE_4);

    $FS.unlinkSync(TEST_FILE_1);
    $FS.unlinkSync(TEST_FILE_2);
    $FS.unlinkSync(TEST_FILE_3);
    $FS.unlinkSync(TEST_FILE_4);

})();
