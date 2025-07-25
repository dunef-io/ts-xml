import { XmlTokenizer } from './internal/parser/tokenizer';
import { XmlNodeType } from './node_type';

describe('XmlTokenizer', () => {
    it('should tokenize a simple element', () => {
        const tokenizer = new XmlTokenizer('<data></data>');
        const events = tokenizer.tokenize();
        expect(events).toHaveLength(2);
        expect(events[0].nodeType).toBe(XmlNodeType.ELEMENT);
        expect((events[0] as any).name).toBe('data');
        expect(events[1].nodeType).toBe(XmlNodeType.ELEMENT);
    });

    it('should tokenize an element with text', () => {
        const tokenizer = new XmlTokenizer('<data>Hello</data>');
        const events = tokenizer.tokenize();
        expect(events).toHaveLength(3);
        expect(events[1].nodeType).toBe(XmlNodeType.TEXT);
        expect((events[1] as any).value).toBe('Hello');
    });

    it('should tokenize an element with attributes', () => {
        const tokenizer = new XmlTokenizer('<data key="value"></data>');
        const events = tokenizer.tokenize();
        expect(events).toHaveLength(2);
        const startElement = events[0] as any;
        expect(startElement.attributes).toHaveLength(1);
        expect(startElement.attributes[0].name).toBe('key');
        expect(startElement.attributes[0].value).toBe('value');
    });
});

import { XmlDocument } from './document';

describe('XmlDocument.parse', () => {
    it('should parse a simple document', () => {
        const document = XmlDocument.parse('<data>Hello</data>');
        expect(document).toBeInstanceOf(XmlDocument);
        expect(document.rootElement).toBeDefined();
        expect(document.rootElement.name.local).toBe('data');
        expect(document.rootElement.children[0].nodeType).toBe(8); // TEXT
        expect((document.rootElement.children[0] as any).value).toBe('Hello');
    });

    it('should parse a document with a comment', () => {
        const document = XmlDocument.parse('<data><!-- comment --></data>');
        expect(document.rootElement.children[0].nodeType).toBe(2); // COMMENT
        expect((document.rootElement.children[0] as any).value).toBe(' comment ');
    });

    it('should parse a document with a CDATA section', () => {
        const document = XmlDocument.parse(
            '<data><![CDATA[cdata]]></data>',
        );
        expect(document.rootElement.children[0].nodeType).toBe(1); // CDATA
        expect((document.rootElement.children[0] as any).value).toBe('cdata');
    });

    it('should parse a document with a processing instruction', () => {
        const document = XmlDocument.parse(
            '<data><?pi target?></data>',
        );
        expect(document.rootElement.children[0].nodeType).toBe(
            XmlNodeType.PROCESSING,
        );
        expect((document.rootElement.children[0] as any).target).toBe('pi');
        expect((document.rootElement.children[0] as any).value).toBe('target');
    });
});