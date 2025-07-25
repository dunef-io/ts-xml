import { XmlDocument } from './document';
import { XmlDocumentImpl } from './internal/document';

describe('XmlWriter', () => {
    it('should write a document to string', () => {
        const document: XmlDocument = XmlDocumentImpl.parse(
            '<body>\n' +
            '  <a>\tWhat\r the  heck?\n</a>\n' +
            '  <b>\tWhat\r the  heck?\n</b>\n' +
            '</body>',
        );
        const output = document.toXmlString();
        expect(output).toBe(
            '<body>\n' +
            '  <a>\tWhat\r the  heck?\n</a>\n' +
            '  <b>\tWhat\r the  heck?\n</b>\n' +
            '</body>',
        );
    });

    it('should write a document to string (pretty)', () => {
        const document: XmlDocument = XmlDocumentImpl.parse(
            '<body>\n' +
            '  <a>\tWhat\r the  heck?\n</a>\n' +
            '  <b>\tWhat\r the  heck?\n</b>\n' +
            '</body>',
        );
        const output = document.toXmlString({ pretty: true });
        expect(output).toBe(
            '<body>\n' +
            '  <a>\tWhat\r the  heck?\n</a>\n' +
            '  <b>\tWhat\r the  heck?\n</b>\n' +
            '</body>',
        );
    });
});