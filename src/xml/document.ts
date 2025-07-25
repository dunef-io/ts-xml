import { XmlDeclarationInterface } from './declaration';
import { XmlDoctypeInterface } from './doctype';
import { XmlElementInterface } from './element';
import { XmlHasChildren } from './internal/mixins/has_children';
import { XmlNodeDecoder } from './internal/parser/node_decoder';
import { XmlTokenizer } from './internal/parser/tokenizer';
import { applyMixins } from './internal/utils/apply_mixins';
import { XmlHasChildrenInterface } from './mixins/has_children';
import { XmlNode, XmlNodeInterface } from './node';
import { XmlNodeType } from './node_type';
import { XmlVisitorInterface } from './visitor';

/**
 * XML document node.
 */
export interface XmlDocumentInterface extends XmlNodeInterface, XmlHasChildrenInterface {
    readonly nodeType: XmlNodeType.DOCUMENT;
    readonly declaration: XmlDeclarationInterface | undefined;
    readonly doctype: XmlDoctypeInterface | undefined;
    readonly rootElement: XmlElementInterface;

    copy(): XmlDocumentInterface;
}

class XmlDocument extends XmlNode {
    constructor(public children: XmlNodeInterface[] = []) {
        super();
    }

    static parse(input: string): XmlDocument {
        const tokenizer = new XmlTokenizer(input);
        const events = tokenizer.tokenize();
        const decoder = new XmlNodeDecoder();
        return decoder.decode(events);
    }

    readonly nodeType: XmlNodeType.DOCUMENT = XmlNodeType.DOCUMENT;

    get declaration(): XmlDeclarationInterface | undefined {
        return this.children.find(
            (node): node is XmlDeclarationInterface => node.nodeType === 3, // DECLARATION
        );
    }

    get doctype(): XmlDoctypeInterface | undefined {
        return this.children.find(
            (node): node is XmlDoctypeInterface => node.nodeType === 4, // DOCUMENT_TYPE
        );
    }

    get rootElement(): XmlElementInterface {
        const rootElement = this.children.find(
            (node): node is XmlElementInterface => node.nodeType === 7, // ELEMENT
        );
        if (!rootElement) {
            throw new Error('Document does not have a root element');
        }
        return rootElement;
    }

    copy(): XmlDocument {
        return new XmlDocument(this.children.map((child) => child.copy()));
    }

    accept(visitor: XmlVisitorInterface): void {
        visitor.visitDocument(this);
    }
}

interface XmlDocument extends XmlHasChildrenInterface { }
applyMixins(XmlDocument, [XmlHasChildren]);

export { XmlDocument };