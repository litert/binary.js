import * as $FS from 'fs';
import * as Assert from 'assert';
import * as _ from './utils';
import * as $Binary from '../lib';

function testAsyncWriter(
    callback: () => Promise<$Binary.IFileWriter<false>>,
): void {

    let w!: $Binary.IFileWriter<false>;

    it('open a new file for writing', async () => {

        w = await callback();
        Assert.ok(1);
    });

    it('write data of uint8', async () => {
        for (const v of _.UINT8_DATA) {
            await w.writeUInt8(v);
        }
        Assert.ok(1);
    });

    it('write data of int8', async () => {
        for (const v of _.INT8_DATA) {
            await w.writeInt8(v);
        }
        Assert.ok(1);
    });

    it('write data of uint16', async () => {
        for (const v of _.UINT16_DATA) {
            await w.writeUInt16LE(v);
            await w.writeUInt16BE(v);
        }
        Assert.ok(1);
    });

    it('write data of int16', async () => {
        for (const v of _.INT16_DATA) {
            await w.writeInt16LE(v);
            await w.writeInt16BE(v);
        }
        Assert.ok(1);
    });

    it('write data of uint32', async () => {
        for (const v of _.UINT32_DATA) {
            await w.writeUInt32LE(v);
            await w.writeUInt32BE(v);
        }
        Assert.ok(1);
    });

    it('write data of int32', async () => {
        for (const v of _.INT32_DATA) {
            await w.writeInt32LE(v);
            await w.writeInt32BE(v);
        }
        Assert.ok(1);
    });

    it('write data of uint64', async () => {
        for (const v of _.UINT64_DATA) {
            await w.writeUInt64LE(v);
            await w.writeUInt64BE(v);
        }
        Assert.ok(1);
    });

    it('write data of int64', async () => {
        for (const v of _.INT64_DATA) {
            await w.writeInt64LE(v);
            await w.writeInt64BE(v);
        }
        Assert.ok(1);
    });

    it('write data of float32', async () => {
        for (const v of _.FLOAT32_DATA) {
            await w.writeFloatLE(v);
            await w.writeFloatBE(v);
        }
        Assert.ok(1);
    });

    it('write data of double64', async () => {
        for (const v of _.DOUBLE64_DATA) {
            await w.writeDoubleLE(v);
            await w.writeDoubleBE(v);
        }
        Assert.ok(1);
    });

    it('write data of buffer', async () => {
        for (const v of _.BUFFER_DATA) {
            await w.writeBuffer(v);
        }
        Assert.ok(1);
    });

    it('should be closed correctly', async () => {

        await w.close();
        Assert.ok(1);
    });
}

function testSyncWriter(
    callback: () => $Binary.IFileWriter,
): void {

    let w!: $Binary.IFileWriter;

    it('open a new file for writing', () => {

        w = callback();
        Assert.ok(1);
    });

    it('write data of uint8', () => {
        for (const v of _.UINT8_DATA) {
            w.writeUInt8(v);
        }
        Assert.ok(1);
    });

    it('write data of int8', () => {
        for (const v of _.INT8_DATA) {
            w.writeInt8(v);
        }
        Assert.ok(1);
    });

    it('write data of uint16', () => {
        for (const v of _.UINT16_DATA) {
            w.writeUInt16LE(v);
            w.writeUInt16BE(v);
        }
        Assert.ok(1);
    });

    it('write data of int16', () => {
        for (const v of _.INT16_DATA) {
            w.writeInt16LE(v);
            w.writeInt16BE(v);
        }
        Assert.ok(1);
    });

    it('write data of uint32', () => {
        for (const v of _.UINT32_DATA) {
            w.writeUInt32LE(v);
            w.writeUInt32BE(v);
        }
        Assert.ok(1);
    });

    it('write data of int32', () => {
        for (const v of _.INT32_DATA) {
            w.writeInt32LE(v);
            w.writeInt32BE(v);
        }
        Assert.ok(1);
    });

    it('write data of uint64', () => {
        for (const v of _.UINT64_DATA) {
            w.writeUInt64LE(v);
            w.writeUInt64BE(v);
        }
        Assert.ok(1);
    });

    it('write data of int64', () => {
        for (const v of _.INT64_DATA) {
            w.writeInt64LE(v);
            w.writeInt64BE(v);
        }
        Assert.ok(1);
    });

    it('write data of float32', () => {
        for (const v of _.FLOAT32_DATA) {
            w.writeFloatLE(v);
            w.writeFloatBE(v);
        }
        Assert.ok(1);
    });

    it('write data of double64', () => {
        for (const v of _.DOUBLE64_DATA) {
            w.writeDoubleLE(v);
            w.writeDoubleBE(v);
        }
        Assert.ok(1);
    });

    it('write data of buffer', () => {
        for (const v of _.BUFFER_DATA) {
            w.writeBuffer(v);
        }
        Assert.ok(1);
    });

    it('should be closed correctly', () => {

        w.close();
        Assert.ok(1);
    });
}

describe('File', function() {

    describe('AsyncWriter', function() {

        const file = `${_.TEST_DIR}/async-file-writer.bin`;

        testAsyncWriter(() => $Binary.AsyncFileWriter.createFromPath(file, 0));

        _.testReadWritenFile(file);
    });

    describe('AsyncBufferWriter', function() {

        const file = `${_.TEST_DIR}/async-file-buffer-writer.bin`;

        testAsyncWriter(() => $Binary.AsyncFileBufferWriter.createFromPath(file, 0, 128));

        _.testReadWritenFile(file);
    });

    describe('SyncWriter', function() {

        const file = `${_.TEST_DIR}/sync-file-writer.bin`;

        testSyncWriter(() => {

            const fd = $FS.openSync(file, 'w');
            const w = new $Binary.SyncFileWriter(fd);

            return w;
        });

        _.testReadWritenFile(file);
    });

    describe('SyncBufferWriter', function() {

        const file = `${_.TEST_DIR}/sync-file-buffer-writer.bin`;

        testSyncWriter(() => {

            const fd = $FS.openSync(file, 'w');
            const w = new $Binary.SyncFileBufferWriter(fd, 0, 128);

            return w;
        });

        _.testReadWritenFile(file);
    });
});
