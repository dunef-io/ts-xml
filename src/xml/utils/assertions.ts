import { XmlDocument } from '../document.js';

export function assertDocumentParseInvariants(input: string): void {
    const document = XmlDocument.parse(input);
    expect(document.toXmlString()).toEqual(input);
    const copy = document.copy();
    expect(document.toXmlString()).toEqual(copy.toXmlString());
}