import {
    XmlHasAttributesInterface, XmlNameInterface, XmlVisitorInterface
} from './interfaces/index.js';
import { XmlElementInterface, XmlTextInterface } from './interfaces/index.js';
import { XmlAttribute } from './attribute.js';
import { XmlCDATA } from './cdata.js';
import { XmlComment } from './comment.js';
import { XmlDeclaration } from './declaration.js';
import { XmlDoctype } from './doctype.js';
import { XmlDocument } from './document.js';
import { XmlElement } from './element.js';
import { XmlProcessing } from './processing.js';
import { XmlText } from './text.js';
import { XmlHasVisitorInterface } from './interfaces/has_visitor.js';
import { XmlEntityMapping, defaultEntityMapping } from './entities/index.js';
import { XmlToken, StringBuffer } from './utils/index.js';

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