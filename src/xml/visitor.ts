import { XmlHasVisitor } from './mixins/has_visitor';
import { XmlName } from './name';
import { XmlAttribute } from './attribute';
import { XmlDeclaration } from './declaration';
import { XmlDocument } from './document';
import { XmlElement } from './element';
import { XmlCDATA } from './cdata';
import { XmlComment } from './comment';
import { XmlDoctype } from './doctype';
import { XmlProcessing } from './processing';
import { XmlText } from './text';

export interface XmlVisitor {
    visit(node: XmlHasVisitor): void;
    visitName(name: XmlName): void;
    visitAttribute(node: XmlAttribute): void;
    visitDeclaration(node: XmlDeclaration): void;
    visitDocument(node: XmlDocument): void;
    visitElement(node: XmlElement): void;
    visitCDATA(node: XmlCDATA): void;
    visitComment(node: XmlComment): void;
    visitDoctype(node: XmlDoctype): void;
    visitProcessing(node: XmlProcessing): void;
    visitText(node: XmlText): void;
}