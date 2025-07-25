import { XmlDocumentImpl } from '../internal/document';

export function assertDocumentParseInvariants(input: string): void {
    const document = XmlDocumentImpl.parse(input);
    expect(document.toXmlString()).toEqual(input);
    const copy = document.copy();
    expect(document.toXmlString()).toEqual(copy.toXmlString());
}