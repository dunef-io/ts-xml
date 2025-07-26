import {
    XmlHasAttributesInterface, XmlNameInterface, XmlVisitorInterface
} from '@src/xml/interfaces';
import { XmlElementInterface, XmlTextInterface } from './interfaces';
import { XmlAttribute } from './attribute';
import { XmlCDATA } from './cdata';
import { XmlComment } from './comment';
import { XmlDeclaration } from './declaration';
import { XmlDoctype } from './doctype';
import { XmlDocument } from './document';
import { XmlElement } from './element';
import { XmlProcessing } from './processing';
import { XmlText } from './text';
import { XmlHasVisitorInterface } from './interfaces/has_visitor';
import { XmlEntityMapping, defaultEntityMapping } from './entities';
import { XmlToken, StringBuffer } from './utils';

export class XmlWriter implements XmlVisitorInterface {
    protected readonly buffer: StringBuffer;
    protected readonly entityMapping: XmlEntityMapping;

    constructor(buffer: StringBuffer, entityMapping: XmlEntityMapping = defaultEntityMapping) {
        this.buffer = buffer;
        this.entityMapping = entityMapping;
    }

    visit(node: XmlHasVisitorInterface): void {
        node.accept(this);
    }

    visitName(name: XmlNameInterface): void {
        this.buffer.write(name.qualified);
    }

    visitAttribute(node: XmlAttribute): void {
        this.visitName(node.name);
        this.buffer.write(XmlToken.EQUALS);
        this.buffer.write(this.entityMapping.encodeAttributeValueWithQuotes(node.value, node.attributeType));
    }

    visitDeclaration(node: XmlDeclaration): void {
        this.buffer.write(XmlToken.OPEN_DECLARATION);
        this.writeAttributes(node);
        this.buffer.write(XmlToken.CLOSE_DECLARATION);
    }

    visitDocument(node: XmlDocument): void {
        this.writeIterable(node.children);
    }

    visitElement(node: XmlElementInterface): void {
        this.buffer.write(XmlToken.OPEN_ELEMENT);
        node.name.accept(this);
        this.writeAttributes(node);
        if (node.children.length === 0 && node.isSelfClosing) {
            this.buffer.write(XmlToken.CLOSE_END_ELEMENT);
        } else {
            this.buffer.write(XmlToken.CLOSE_ELEMENT);
            this.writeIterable(node.children);
            this.buffer.write(XmlToken.OPEN_END_ELEMENT);
            node.name.accept(this);
            this.buffer.write(XmlToken.CLOSE_ELEMENT);
        }
    }

    visitCDATA(node: XmlCDATA): void {
        this.buffer.write(XmlToken.OPEN_CDATA);
        this.buffer.write(node.value);
        this.buffer.write(XmlToken.CLOSE_CDATA);
    }

    visitComment(node: XmlComment): void {
        this.buffer.write(XmlToken.OPEN_COMMENT);
        this.buffer.write(node.value);
        this.buffer.write(XmlToken.CLOSE_COMMENT);
    }

    visitDoctype(node: XmlDoctype): void {
        this.buffer.write(XmlToken.OPEN_DOCTYPE);
        this.buffer.write(XmlToken.WHITESPACE);
        this.buffer.write(node.name);
        // DTD support is not fully implemented
        this.buffer.write(XmlToken.CLOSE_DOCTYPE);
    }

    visitProcessing(node: XmlProcessing): void {
        this.buffer.write(XmlToken.OPEN_PROCESSING);
        this.buffer.write(node.target);
        if (node.value.length > 0) {
            this.buffer.write(XmlToken.WHITESPACE);
            this.buffer.write(node.value);
        }
        this.buffer.write(XmlToken.CLOSE_PROCESSING);
    }

    visitText(node: XmlTextInterface): void {
        this.buffer.write(this.entityMapping.encodeText(node.value));
    }

    protected writeAttributes(node: XmlHasAttributesInterface): void {
        if (node.attributes.length > 0) {
            this.buffer.write(XmlToken.WHITESPACE);
            this.writeIterable(node.attributes, XmlToken.WHITESPACE);
        }
    }

    protected writeIterable(nodes: ReadonlyArray<XmlHasVisitorInterface>, separator?: string): void {
        const iterator = nodes[Symbol.iterator]();
        let result = iterator.next();
        while (!result.done) {
            this.visit(result.value);
            result = iterator.next();
            if (separator && !result.done) {
                this.buffer.write(separator);
            }
        }
    }

    toString(): string {
        return this.buffer.toString();
    }
}