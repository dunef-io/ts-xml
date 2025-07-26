export class StringBuffer {
    private _buffer: string[] = [];

    public write(value: any): void {
        this._buffer.push(value.toString());
    }

    public toString(): string {
        return this._buffer.join('');
    }
}