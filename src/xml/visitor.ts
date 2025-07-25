import { XmlHasVisitorInterface } from './mixins/has_visitor';
import { XmlNameInterface } from './name';
import { XmlAttributeInterface } from './attribute';
import { XmlDeclarationInterface } from './declaration';
import { XmlDocumentInterface } from './document';
import { XmlElementInterface } from './element';
import { XmlCDATAInterface } from './cdata';
import { XmlComment } from './comment';
import { XmlDoctypeInterface } from './doctype';
import { XmlProcessing } from './processing';
import { XmlText } from './text';

export interface XmlVisitorInterface {
    visit(node: XmlHasVisitorInterface): void;
    visitName(name: XmlNameInterface): void;
    visitAttribute(node: XmlAttributeInterface): void;
    visitDeclaration(node: XmlDeclarationInterface): void;
    visitDocument(node: XmlDocumentInterface): void;
    visitElement(node: XmlElementInterface): void;
    visitCDATA(node: XmlCDATAInterface): void;
    visitComment(node: XmlComment): void;
    visitDoctype(node: XmlDoctypeInterface): void;
    visitProcessing(node: XmlProcessing): void;
    visitText(node: XmlText): void;
}