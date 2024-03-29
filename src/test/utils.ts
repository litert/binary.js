import * as $Binary from '../lib';
import * as Assert from 'assert';
import * as $FS from 'fs';

export const OFFSET_10MB = 10 * 1024 * 1024;

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

export const UINT8_DATA = createArray(16, () => randInt(0, 255));
export const INT8_DATA = createArray(16, () => randInt(-128, 127));
export const UINT16_DATA = createArray(16, () => randInt(0, 65535));
export const INT16_DATA = createArray(16, () => randInt(-32768, 32767));
export const UINT32_DATA = createArray(16, () => randInt(0, 4294967295));
export const INT32_DATA = createArray(16, () => randInt(-2147483648, 2147483647));
export const UINT64_DATA = createArray(16, () => randInt(0, 42949672950));
export const INT64_DATA = createArray(16, () => randInt(-21474836480, 21474836470));
export const FLOAT32_DATA = createArray(16, () => parseFloat((Math.random() * 1000).toFixed(3)));
export const DOUBLE64_DATA = createArray(16, () => parseFloat((Math.random() * 100000).toFixed(5)));
export const BUFFER_DATA = createArray(
    16,
    () => Buffer.from(createArray(
        randInt(1, 1024 * 64),
        () => randInt(0, 255)
    ))
);

export const TEST_DIR = './data';

$FS.mkdirSync(TEST_DIR, { recursive: true });

export function testReadWritenFileWithSyncReader(
    mode: string,
    path: string,
    createReader: (path: string) => $Binary.IFileReader
): void {

    describe(mode, function() {
        let reader!: $Binary.IFileReader;

        it(`open file for reading`, () => {

            reader = createReader(path);
            Assert.ok(1);
        });

        it(`read data of uint8`, () => {
            for (const v of UINT8_DATA) {

                Assert.equal(reader.readUInt8(), v);
            }
        });

        it(`read data of int8`, () => {
            for (const v of INT8_DATA) {

                Assert.equal(reader.readInt8(), v);
            }
        });

        it(`read data of uint16`, () => {
            for (const v of UINT16_DATA) {

                Assert.equal(reader.readUInt16LE(), v);
                Assert.equal(reader.readUInt16BE(), v);
            }
        });

        it(`read data of int16`, () => {
            for (const v of INT16_DATA) {

                Assert.equal(reader.readInt16LE(), v);
                Assert.equal(reader.readInt16BE(), v);
            }
        });

        it(`read data of uint32`, () => {
            for (const v of UINT32_DATA) {

                Assert.equal(reader.readUInt32LE(), v);
                Assert.equal(reader.readUInt32BE(), v);
            }
        });

        it(`read data of int32`, () => {
            for (const v of INT32_DATA) {

                Assert.equal(reader.readInt32LE(), v);
                Assert.equal(reader.readInt32BE(), v);
            }
        });

        it(`read data of uint64`, () => {
            for (const v of UINT64_DATA) {

                const V = BigInt(v);
                const l = Math.random() < 0.5 ? reader.readUIntSafeLE() : reader.readUInt64LE();
                const b = reader.readUInt64BE();
                Assert.equal(BigInt(l), V);
                Assert.equal(b, V);
            }
        });

        it(`read data of int64`, () => {
            for (const v of INT64_DATA) {

                Assert.equal(reader.readInt64LE(), BigInt(v));
                Assert.equal(reader.readInt64BE(), BigInt(v));
            }
        });

        it(`read data of float32`, () => {
            for (const v of FLOAT32_DATA) {

                const l = parseFloat(reader.readFloatLE().toFixed(3));
                const b = parseFloat(reader.readFloatBE().toFixed(3));
                Assert.equal(l, v);
                Assert.equal(b, v);
            }
        });

        it(`read data of double64`, () => {
            for (const v of DOUBLE64_DATA) {

                Assert.equal(reader.readDoubleLE(), v);
                Assert.equal(reader.readDoubleBE(), v);
            }
        });

        it(`seek to 10mb offset`, () => {
            reader.seek(OFFSET_10MB);
            Assert.ok(1);
        });

        it(`read data of buffer`, () => {
            for (const v of BUFFER_DATA) {

                const b = reader.readBuffer(v.byteLength);

                Assert.equal(b.compare(v), 0);
            }
        });

        it(`close file for reading`, () => {
            reader.close();
            Assert.ok(1);
        });

    });
}

export function testReadWritenFileWithAsyncReader(
    mode: string,
    path: string,
    createReader: (path: string) => Promise<$Binary.IFileReader<false>>
): void {

    describe(mode, function() {
        let reader!: $Binary.IFileReader<false>;

        it(`open file for reading`, async () => {

            reader = await createReader(path);
            Assert.ok(1);
        });

        it(`read data of uint8`, async () => {
            for (const v of UINT8_DATA) {

                Assert.equal(await reader.readUInt8(), v);
            }
        });

        it(`read data of int8`, async () => {
            for (const v of INT8_DATA) {

                Assert.equal(await reader.readInt8(), v);
            }
        });

        it(`read data of uint16`, async () => {
            for (const v of UINT16_DATA) {

                Assert.equal(await reader.readUInt16LE(), v);
                Assert.equal(await reader.readUInt16BE(), v);
            }
        });

        it(`read data of int16`, async () => {
            for (const v of INT16_DATA) {

                Assert.equal(await reader.readInt16LE(), v);
                Assert.equal(await reader.readInt16BE(), v);
            }
        });

        it(`read data of uint32`, async () => {
            for (const v of UINT32_DATA) {

                Assert.equal(await reader.readUInt32LE(), v);
                Assert.equal(await reader.readUInt32BE(), v);
            }
        });

        it(`read data of int32`, async () => {
            for (const v of INT32_DATA) {

                Assert.equal(await reader.readInt32LE(), v);
                Assert.equal(await reader.readInt32BE(), v);
            }
        });

        it(`read data of uint64`, async () => {
            for (const v of UINT64_DATA) {

                const V = BigInt(v);
                const l = Math.random() < 0.5 ? await reader.readUIntSafeLE() : await reader.readUInt64LE();
                const b = await reader.readUInt64BE();
                Assert.equal(BigInt(l), V);
                Assert.equal(b, V);
            }
        });

        it(`read data of int64`, async () => {
            for (const v of INT64_DATA) {

                Assert.equal(await reader.readInt64LE(), BigInt(v));
                Assert.equal(await reader.readInt64BE(), BigInt(v));
            }
        });

        it(`read data of float32`, async () => {
            for (const v of FLOAT32_DATA) {

                const l = parseFloat((await reader.readFloatLE()).toFixed(3));
                const b = parseFloat((await reader.readFloatBE()).toFixed(3));
                Assert.equal(l, v);
                Assert.equal(b, v);
            }
        });

        it(`read data of double64`, async () => {
            for (const v of DOUBLE64_DATA) {

                Assert.equal(await reader.readDoubleLE(), v);
                Assert.equal(await reader.readDoubleBE(), v);
            }
        });

        it(`seek to 10mb offset`, async () => {
            await reader.seek(OFFSET_10MB);
            Assert.ok(1);
        });

        it(`read data of buffer`, async () => {
            for (const v of BUFFER_DATA) {

                const b = await reader.readBuffer(v.byteLength);

                Assert.equal(b.compare(v), 0);
            }
        });

        it(`close file for reading`, async () => {
            await reader.close();
            Assert.ok(1);
        });

    });
}
