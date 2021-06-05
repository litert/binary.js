import * as E from './Errors';

export abstract class AbstractBufferHelper {

    protected _pos!: number;

    public constructor(
        protected _buf: Buffer,
        pos: number = 0
    ) {

        this.seek(pos);
    }

    public get length(): number {

        return this._buf.byteLength;
    }

    public get position(): number {

        return this._pos;
    }

    public seek(newPosition: number): number {

        if (newPosition > this._buf.byteLength) {

            throw new E.E_EOF({ position: newPosition, length: 0 });
        }

        const prevOffset = this._pos;

        this._pos = newPosition;

        return prevOffset;
    }

    public seekDulta(dultaOffset: number): number {

        const prevOffset = this._pos;

        this._pos += dultaOffset;

        return prevOffset;
    }

}
