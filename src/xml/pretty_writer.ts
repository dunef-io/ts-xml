import { XmlAttributeInterface } from '@src/xml/interfaces';
import { XmlElementInterface, XmlDeclarationInterface } from './interfaces';
import { XmlNodeInterface, XmlTextInterface } from './interfaces';
import { XmlNodeType } from './node_type';
import { XmlWriter } from './writer';
import { XmlDocument } from './document';
import { XmlText } from './text';
import { StringBuffer, XmlToken } from './utils';
import { XmlEntityMapping, defaultEntityMapping } from './entities';
export class PrettyXmlWriter extends XmlWriter {
    private level: number;
    private pretty: boolean;
    readonly indent: string;
    readonly newLine: string;
    readonly preserveWhitespace: (node: XmlNodeInterface) => boolean;
    readonly indentAttribute: (attribute: XmlAttributeInterface) => boolean;
    readonly sortAttributes: (a: XmlAttributeInterface, b: XmlAttributeInterface) => number;
    readonly spaceBeforeSelfClose: (node: XmlNodeInterface) => boolean;

    constructor(
        buffer: StringBuffer,
        options: {
            entityMapping?: XmlEntityMapping;
            level?: number;
            indent?: string;
            newLine?: string;
            preserveWhitespace?: (node: XmlNodeInterface) => boolean;
            indentAttribute?: (attribute: XmlAttributeInterface) => boolean;
            sortAttributes?: (a: XmlAttributeInterface, b: XmlAttributeInterface) => number;
            spaceBeforeSelfClose?: (node: XmlNodeInterface) => boolean;
        } = {}
    ) {
        super(buffer, options.entityMapping ?? defaultEntityMapping);
        this.level = options.level ?? 0;
        this.pretty = true;
        this.indent = options.indent ?? '  ';
        this.newLine = options.newLine ?? '\n';
        this.preserveWhitespace = options.preserveWhitespace ?? (() => false);
        this.indentAttribute = options.indentAttribute ?? (() => false);
        this.sortAttributes = options.sortAttributes ?? (() => 0);
        this.spaceBeforeSelfClose = options.spaceBeforeSelfClose ?? (() => false);
    }

    override visitDocument(node: XmlDocument): void {
        this.buffer.write(this.indent.repeat(this.level));
        this.writeIterable(this.normalizeText(node.children), this.newLine + this.indent.repeat(this.level));
    }

    override visitElement(node: XmlElementInterface): void {
        this.buffer.write(XmlToken.OPEN_ELEMENT);
        node.name.accept(this);
        this.writeAttributes(node);
        if (node.children.length === 0 && node.isSelfClosing) {
            if (this.spaceBeforeSelfClose(node)) {
                this.buffer.write(XmlToken.WHITESPACE);
            }
            this.buffer.write(XmlToken.CLOSE_END_ELEMENT);
        } else {
            this.buffer.write(XmlToken.CLOSE_ELEMENT);
            if (node.children.length > 0) {
                if (this.pretty) {
                    if (this.preserveWhitespace(node)) {
                        this.pretty = false;
                        this.writeIterable(node.children);
                        this.pretty = true;
                    } else if (node.children.every((each) => each instanceof XmlText)) {
                        this.writeIterable(this.normalizeText(node.children));
                    }
                    else {
                        this.level++;
                        this.buffer.write(this.newLine);
                        this.buffer.write(this.indent.repeat(this.level));
                        this.writeIterable(this.normalizeText(node.children), this.newLine + this.indent.repeat(this.level));
                        this.level--;
                        this.buffer.write(this.newLine);
                        this.buffer.write(this.indent.repeat(this.level));
                    }
                } else {
                    this.writeIterable(node.children);
                }
            }
            this.buffer.write(XmlToken.OPEN_END_ELEMENT);
            node.name.accept(this);
            this.buffer.write(XmlToken.CLOSE_ELEMENT);
        }
    }

    override writeAttributes(node: XmlElementInterface | XmlDeclarationInterface): void {
        const attributes = this.sortAttributes ? [...node.attributes].sort(this.sortAttributes) : node.attributes;
        for (const attribute of attributes) {
            if (this.pretty && this.indentAttribute(attribute)) {
                this.buffer.write(this.newLine);
                this.buffer.write(this.indent.repeat(this.level + 1));
            } else {
                this.buffer.write(XmlToken.WHITESPACE);
            }
            this.visit(attribute);
        }
    }

    protected normalizeText(nodes: readonly XmlNodeInterface[]): XmlNodeInterface[] {
        const result: XmlNodeInterface[] = [];
        for (const node of nodes) {
            if (node.nodeType === XmlNodeType.TEXT) {
                const textNode = node as XmlTextInterface;
                const originalValue = textNode.value;
                const normalizedText = originalValue.trim().replace(whitespaceOrLineTerminators, ' ');

                if (normalizedText.length > 0) {
                    const lastNode = result.length > 0 ? result[result.length - 1] : undefined;
                    if (lastNode?.nodeType === XmlNodeType.TEXT) {
                        (lastNode as XmlTextInterface).value += normalizedText;
                    } else {
                        result.push(new XmlText(normalizedText));
                    }
                }
            } else {
                result.push(node);
            }
        }
        return result;
    }
}

const whitespaceOrLineTerminators = /\s+/g;