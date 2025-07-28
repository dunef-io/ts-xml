import { describe, it, expect } from '@jest/globals';
import { XmlDocument } from '../document.js';

describe('DTD validation', () => {
    it('should parse a document with an internal DTD subset', () => {
        const xml = `
            <!DOCTYPE note [
                <!ELEMENT note (to,from,heading,body)>
                <!ELEMENT to (#PCDATA)>
                <!ELEMENT from (#PCDATA)>
                <!ELEMENT heading (#PCDATA)>
                <!ELEMENT body (#PCDATA)>
            ]>
            <note>
                <to>Tove</to>
                <from>Jani</from>
                <heading>Reminder</heading>
                <body>Don't forget me this weekend!</body>
            </note>
        `;

        const doc = XmlDocument.parse(xml);

        expect(doc.doctype).toBeDefined();
        expect(doc.doctype?.name).toBe('note');
        expect(doc.doctype?.internalSubset?.trim()).toBe(
            `<!ELEMENT note (to,from,heading,body)>
                <!ELEMENT to (#PCDATA)>
                <!ELEMENT from (#PCDATA)>
                <!ELEMENT heading (#PCDATA)>
                <!ELEMENT body (#PCDATA)>`
        );
    });

    it('should validate a document with a DTD', () => {
        const xml = `
            <!DOCTYPE note [
                <!ELEMENT note (to,from,heading,body)>
                <!ELEMENT to (#PCDATA)>
                <!ELEMENT from (#PCDATA)>
                <!ELEMENT heading (#PCDATA)>
                <!ELEMENT body (#PCDATA)>
            ]>
            <note>
                <to>Tove</to>
                <from>Jani</from>
                <heading>Reminder</heading>
                <body>Don't forget me this weekend!</body>
            </note>
        `;

        const doc = XmlDocument.parse(xml);
        expect(() => doc.validate()).not.toThrow();
    });
});