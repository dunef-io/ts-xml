import { describe, it, expect } from '@jest/globals';
import {
    XmlSaxParser,
    XmlStartElementEvent,
    XmlEndElementEvent,
    XmlTextEvent,
    XmlCommentEvent,
    XmlCDATAEvent,
    XmlProcessingEvent,
} from '../events/index.js';

describe('XmlSaxParser', () => {
    it('should parse a simple document and dispatch events', () => {
        const xml = `
            <root>
                <!-- This is a comment -->
                <item id="1">Hello</item>
                <item id="2">World</item>
                <![CDATA[This is a CDATA section]]>
                <?pi target data?>
            </root>
        `;

        const startElementEvents: XmlStartElementEvent[] = [];
        const endElementEvents: XmlEndElementEvent[] = [];
        const textEvents: XmlTextEvent[] = [];
        const commentEvents: XmlCommentEvent[] = [];
        const cdataEvents: XmlCDATAEvent[] = [];
        const processingEvents: XmlProcessingEvent[] = [];

        const parser = new XmlSaxParser({
            onStartElement: (event) => startElementEvents.push(event),
            onEndElement: (event) => endElementEvents.push(event),
            onText: (event) => textEvents.push(event),
            onComment: (event) => commentEvents.push(event),
            onCDATA: (event) => cdataEvents.push(event),
            onProcessing: (event) => processingEvents.push(event),
        });

        parser.parse(xml);

        expect(startElementEvents).toHaveLength(3);
        expect(startElementEvents[0].name).toBe('root');
        expect(startElementEvents[1].name).toBe('item');
        expect(startElementEvents[1].attributes[0].name).toBe('id');
        expect(startElementEvents[1].attributes[0].value).toBe('1');
        expect(startElementEvents[2].name).toBe('item');
        expect(startElementEvents[2].attributes[0].name).toBe('id');
        expect(startElementEvents[2].attributes[0].value).toBe('2');

        expect(endElementEvents).toHaveLength(3);
        expect(endElementEvents[0].name).toBe('item');
        expect(endElementEvents[1].name).toBe('item');
        expect(endElementEvents[2].name).toBe('root');

        expect(textEvents.map(e => e.value.trim()).filter(e => e)).toEqual(['Hello', 'World']);

        expect(commentEvents).toHaveLength(1);
        expect(commentEvents[0].value).toBe(' This is a comment ');

        expect(cdataEvents).toHaveLength(1);
        expect(cdataEvents[0].value).toBe('This is a CDATA section');

        expect(processingEvents).toHaveLength(1);
        expect(processingEvents[0].target).toBe('pi');
        expect(processingEvents[0].value).toBe('target data');
    });
});