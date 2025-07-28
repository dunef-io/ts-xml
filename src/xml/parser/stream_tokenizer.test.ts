import { describe, it, expect } from '@jest/globals';
import { XmlStreamTokenizer } from './stream_tokenizer.js';
import { XmlNodeType } from '../node_type.js';

describe('XmlStreamTokenizer', () => {
    it('should tokenize a stream of XML', () => {
        const tokenizer = new XmlStreamTokenizer();
        tokenizer.append('<root>');
        tokenizer.append('<item>Hello</item>');
        tokenizer.append('</root>');

        const events = Array.from(tokenizer.tokenize());

        expect(events).toHaveLength(5);
        expect(events[0].nodeType).toBe(XmlNodeType.ELEMENT);
        expect((events[0] as any).name).toBe('root');
        expect(events[1].nodeType).toBe(XmlNodeType.ELEMENT);
        expect((events[1] as any).name).toBe('item');
        expect(events[2].nodeType).toBe(XmlNodeType.TEXT);
        expect((events[2] as any).value).toBe('Hello');
        expect(events[3].nodeType).toBe(XmlNodeType.ELEMENT);
        expect((events[3] as any).name).toBe('item');
        expect(events[4].nodeType).toBe(XmlNodeType.ELEMENT);
        expect((events[4] as any).name).toBe('root');
    });
});