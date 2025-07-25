import { XmlVisitor } from './visitor';
import { XmlAttribute } from './attribute';
import { XmlCDATA } from './cdata';
import { XmlComment } from './comment';
import { XmlDeclaration } from './declaration';
import { XmlDoctype } from './doctype';
import { XmlDocument } from './document';
import { XmlElement } from './element';
import { XmlName } from './name';
import { XmlProcessing } from './processing';
import { XmlText } from './text';
import { XmlHasAttributes } from './mixins/has_attributes';
import { XmlHasVisitor } from './mixins/has_visitor';

class StringBuffer {
    private _buffer: string[] = [];
    write(value: any): void {
        this._buffer.push(value.toString());
    }
    toString(): string {
        return this._buffer.join('');
    }
}

export class XmlWriter implements XmlVisitor {
    protected readonly buffer: StringBuffer;

    constructor() {
        this.buffer = new StringBuffer();
    }

    visit(node: XmlHasVisitor): void {
        node.accept(this);
    }

    visitName(name: XmlName): void {
        this.buffer.write(name.qualified);
    }

    visitAttribute(node: XmlAttribute): void {
        this.visitName(node.name);
        this.buffer.write('="');
        this.buffer.write(node.value);
        this.buffer.write('"');
    }

    visitDeclaration(node: XmlDeclaration): void {
        this.buffer.write('<?xml');
        this.writeAttributes(node);
        this.buffer.write('?>');
    }

    visitDocument(node: XmlDocument): void {
        this.writeIterable(node.children);
    }

    visitElement(node: XmlElement): void {
        this.buffer.write('<');
        this.visitName(node.name);
        this.writeAttributes(node);
        if (node.children.length === 0 && node.isSelfClosing) {
            this.buffer.write('/>');
        } else {
            this.buffer.write('>');
            this.writeIterable(node.children);
            this.buffer.write('</');
            this.visitName(node.name);
            this.buffer.write('>');
        }
    }

    visitCDATA(node: XmlCDATA): void {
        this.buffer.write('<![CDATA[');
        this.buffer.write(node.value);
        this.buffer.write(']]>');
    }

    visitComment(node: XmlComment): void {
        this.buffer.write('<!--');
        this.buffer.write(node.value);
        this.buffer.write('-->');
    }

    visitDoctype(node: XmlDoctype): void {
        this.buffer.write('<!DOCTYPE ');
        this.buffer.write(node.name);
        if (node.externalId) {
            // DTD support is not fully implemented
        }
        if (node.internalSubset) {
            this.buffer.write(' [');
            this.buffer.write(node.internalSubset);
            this.buffer.write(']');
        }
        this.buffer.write('>');
    }

    visitProcessing(node: XmlProcessing): void {
        this.buffer.write('<?');
        this.buffer.write(node.target);
        if (node.value.length > 0) {
            this.buffer.write(' ');
            this.buffer.write(node.value);
        }
        this.buffer.write('?>');
    }

    visitText(node: XmlText): void {
        this.buffer.write(node.value);
    }

    protected writeAttributes(node: XmlHasAttributes): void {
        if (node.attributes.length > 0) {
            this.buffer.write(' ');
            this.writeIterable(node.attributes, ' ');
        }
    }

    protected writeIterable(nodes: ReadonlyArray<XmlHasVisitor>, separator?: string): void {
        for (let i = 0; i < nodes.length; i++) {
            if (i > 0 && separator) {
                this.buffer.write(separator);
            }
            this.visit(nodes[i]);
        }
    }

    toString(): string {
        return this.buffer.toString();
    }
}