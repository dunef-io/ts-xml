import { XmlDeclaration } from '../declaration';
import { XmlDocument } from '../document';
import { XmlDoctype } from '../doctype';
import { XmlElement } from '../element';
import { XmlNode } from '../node';
import { XmlNodeType } from '../node_type';
import { XmlHasChildrenImpl } from './mixins/has_children';
import { XmlNodeImpl } from './node';
import { applyMixins } from './utils/apply_mixins';

/**
 * XML document node.
 */
import { XmlTokenizer } from './parser/tokenizer';
import { XmlNodeDecoder } from './parser/node_decoder';
class XmlDocumentImpl extends XmlNodeImpl {
    constructor(public children: XmlNode[] = []) {
        super();
    }

    static parse(input: string): XmlDocument {
        const tokenizer = new XmlTokenizer(input);
        const events = tokenizer.tokenize();
        const decoder = new XmlNodeDecoder();
        return decoder.decode(events);
    }

    readonly nodeType: XmlNodeType.DOCUMENT = XmlNodeType.DOCUMENT;

    get declaration(): XmlDeclaration | undefined {
        return this.children.find(
            (node): node is XmlDeclaration => node.nodeType === 3, // DECLARATION
        );
    }

    get doctype(): XmlDoctype | undefined {
        return this.children.find(
            (node): node is XmlDoctype => node.nodeType === 4, // DOCUMENT_TYPE
        );
    }

    get rootElement(): XmlElement {
        const rootElement = this.children.find(
            (node): node is XmlElement => node.nodeType === 7, // ELEMENT
        );
        if (!rootElement) {
            throw new Error('Document does not have a root element');
        }
        return rootElement;
    }

    copy(): XmlDocument {
        return new XmlDocumentImpl(this.children.map((child) => child.copy()));
    }

    accept(visitor: import('../visitor').XmlVisitor): void {
        visitor.visitDocument(this);
    }
}

interface XmlDocumentImpl extends XmlHasChildrenImpl { }
applyMixins(XmlDocumentImpl, [XmlHasChildrenImpl]);

export { XmlDocumentImpl };