import {
    XmlCDATAEvent,
    XmlCommentEvent,
    XmlDeclarationEvent,
    XmlDoctypeEvent,
    XmlEndElementEvent,
    XmlProcessingEvent,
    XmlStartElementEvent,
    XmlTextEvent,
} from './events.js';
import { XmlStreamTokenizer } from './stream_tokenizer.js';
import { XmlEvent } from '../events/index.js';
import { XmlNodeType } from '../node_type.js';

type SaxParserCallbacks = {
    onStartElement?: (event: XmlStartElementEvent) => void;
    onEndElement?: (event: XmlEndElementEvent) => void;
    onText?: (event: XmlTextEvent) => void;
    onComment?: (event: XmlCommentEvent) => void;
    onCDATA?: (event: XmlCDATAEvent) => void;
    onProcessing?: (event: XmlProcessingEvent) => void;
    onDoctype?: (event: XmlDoctypeEvent) => void;
    onDeclaration?: (event: XmlDeclarationEvent) => void;
};

export class XmlSaxParser {
    private readonly _callbacks: SaxParserCallbacks;

    constructor(callbacks: SaxParserCallbacks) {
        this._callbacks = callbacks;
    }

    parse(chunk: string): void {
        const tokenizer = new XmlStreamTokenizer(chunk);
        for (const event of tokenizer.tokenize()) {
            this.dispatchEvent(event);
        }
    }

    private dispatchEvent(event: XmlEvent): void {
        switch (event.nodeType) {
            case XmlNodeType.ELEMENT:
                const startElementEvent = event as XmlStartElementEvent;
                if (startElementEvent.isSelfClosing !== undefined) {
                    if (this._callbacks.onStartElement) {
                        this._callbacks.onStartElement(event as XmlStartElementEvent);
                    }
                } else {
                    if (this._callbacks.onEndElement) {
                        this._callbacks.onEndElement(event as XmlEndElementEvent);
                    }
                }
                break;
            case XmlNodeType.TEXT:
                if (this._callbacks.onText) {
                    this._callbacks.onText(event as XmlTextEvent);
                }
                break;
            case XmlNodeType.COMMENT:
                if (this._callbacks.onComment) {
                    this._callbacks.onComment(event as XmlCommentEvent);
                }
                break;
            case XmlNodeType.CDATA:
                if (this._callbacks.onCDATA) {
                    this._callbacks.onCDATA(event as XmlCDATAEvent);
                }
                break;
            case XmlNodeType.PROCESSING:
                if (this._callbacks.onProcessing) {
                    this._callbacks.onProcessing(event as XmlProcessingEvent);
                }
                break;
            case XmlNodeType.DOCUMENT_TYPE:
                if (this._callbacks.onDoctype) {
                    this._callbacks.onDoctype(event as XmlDoctypeEvent);
                }
                break;
            case XmlNodeType.DECLARATION:
                if (this._callbacks.onDeclaration) {
                    this._callbacks.onDeclaration(event as XmlDeclarationEvent);
                }
                break;
        }
    }
}