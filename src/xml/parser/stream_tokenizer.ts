import { XmlEvent, XmlStartElementEvent, XmlEndElementEvent, XmlTextEvent, XmlCommentEvent, XmlCDATAEvent, XmlProcessingEvent } from '../events/index.js';
import { XmlEventAttribute } from '../events/event_attribute.js';
import { XmlNodeType } from '../node_type.js';

export class XmlStreamTokenizer {
    private _input = '';
    private _index = 0;

    constructor(input?: string) {
        if (input) {
            this._input = input;
        }
    }

    append(input: string): void {
        this._input += input;
    }

    *tokenize(): Generator<XmlEvent> {
        while (this._index < this._input.length) {
            const char = this._input[this._index];
            if (char === '<') {
                const nextChar = this._input[this._index + 1];
                if (nextChar === '/') {
                    yield this.parseEndElement();
                } else if (nextChar === '!') {
                    if (this._input.substring(this._index + 2, this._index + 4) === '--') {
                        yield this.parseComment();
                    } else if (
                        this._input.substring(this._index + 2, this._index + 9) ===
                        '[CDATA['
                    ) {
                        yield this.parseCDATA();
                    }
                } else if (nextChar === '?') {
                    yield this.parseProcessing();
                } else {
                    yield this.parseStartElement();
                }
            } else {
                yield this.parseText();
            }
        }
    }

    private parseStartElement(): XmlStartElementEvent {
        this._index++;
        const name = this.parseName();
        this.skipWhitespace();
        const attributes = this.parseAttributes();
        this.skipWhitespace();
        const isSelfClosing = this._input[this._index] === '/';
        if (isSelfClosing) {
            this._index++;
        }
        this._index++;
        return {
            nodeType: XmlNodeType.ELEMENT,
            name,
            attributes,
            isSelfClosing,
        };
    }

    private parseEndElement(): XmlEndElementEvent {
        this._index += 2;
        const name = this.parseName();
        this._index++;
        return {
            nodeType: XmlNodeType.ELEMENT,
            name,
        };
    }

    private parseText(): XmlTextEvent {
        const start = this._index;
        while (
            this._index < this._input.length &&
            this._input[this._index] !== '<'
        ) {
            this._index++;
        }
        return {
            nodeType: XmlNodeType.TEXT,
            value: this._input.substring(start, this._index),
        };
    }

    private parseName(): string {
        const start = this._index;
        while (
            this._index < this._input.length &&
            !/\s|\/|>|=/.test(this._input[this._index])
        ) {
            this._index++;
        }
        return this._input.substring(start, this._index);
    }

    private parseAttributes(): XmlEventAttribute[] {
        const attributes: XmlEventAttribute[] = [];
        this.skipWhitespace();
        while (
            this._index < this._input.length &&
            this._input[this._index] !== '>' &&
            this._input[this._index] !== '/'
        ) {
            const name = this.parseName();
            this.skipWhitespace();
            if (this._input[this._index] === '=') {
                this._index++; // Skip '='
                this.skipWhitespace();
                const value = this.parseAttributeValue();
                attributes.push(new XmlEventAttribute(name, value, 1));
            }
            this.skipWhitespace();
        }
        return attributes;
    }

    private parseAttributeValue(): string {
        const quote = this._input[this._index];
        this._index++;
        const start = this._index;
        while (
            this._index < this._input.length &&
            this._input[this._index] !== quote
        ) {
            this._index++;
        }
        const value = this._input.substring(start, this._index);
        this._index++;
        return value;
    }

    private skipWhitespace(): void {
        while (
            this._index < this._input.length &&
            /\s/.test(this._input[this._index])
        ) {
            this._index++;
        }
    }

    private parseComment(): XmlCommentEvent {
        this._index += 4;
        const start = this._index;
        const end = this._input.indexOf('-->', start);
        this._index = end + 3;
        return {
            nodeType: XmlNodeType.COMMENT,
            value: this._input.substring(start, end),
        };
    }

    private parseCDATA(): XmlCDATAEvent {
        this._index += 9;
        const start = this._index;
        const end = this._input.indexOf(']]>', start);
        this._index = end + 3;
        return {
            nodeType: XmlNodeType.CDATA,
            value: this._input.substring(start, end),
        };
    }

    private parseProcessing(): XmlProcessingEvent {
        this._index += 2;
        const target = this.parseName();
        this.skipWhitespace();
        const start = this._index;
        const end = this._input.indexOf('?>', start);
        this._index = end + 2;
        return {
            nodeType: XmlNodeType.PROCESSING,
            target,
            value: this._input.substring(start, end),
        };
    }
}