import {
    XmlDeclarationInterface,
    XmlDoctypeInterface,
    XmlElementInterface,
    XmlNodeInterface,
    XmlDocumentInterface,
    XmlVisitorInterface,
} from './interfaces';
import { XmlNodeDecoder } from './parser/node_decoder';
import { XmlTokenizer } from './parser/tokenizer';
import { XmlNodeType } from './node_type';
import { NodeManager } from './node_manager';
import { getDescendants } from './utils/descendants';

class XmlDocument implements XmlDocumentInterface {
    private readonly _nodeManager: NodeManager;

    constructor(public children: XmlNodeInterface[] = []) {
        this._nodeManager = new NodeManager(XmlNodeType.DOCUMENT);
    }

    static parse(input: string): XmlDocument {
        const tokenizer = new XmlTokenizer(input);
        const events = tokenizer.tokenize();
        const decoder = new XmlNodeDecoder();
        return decoder.decode(events);
    }

    get nodeType(): XmlNodeType.DOCUMENT {
        return XmlNodeType.DOCUMENT;
    }

    get parentNode(): XmlNodeInterface | undefined {
        return this._nodeManager.parentNode;
    }

    set parentNode(parentNode: XmlNodeInterface | undefined) {
        this._nodeManager.parentNode = parentNode;
    }

    get innerText(): string {
        return this._nodeManager.getInnerText(this);
    }

    get declaration(): XmlDeclarationInterface | undefined {
        return this.children.find(
            (node): node is XmlDeclarationInterface => node.nodeType === XmlNodeType.DECLARATION,
        );
    }

    get doctype(): XmlDoctypeInterface | undefined {
        return this.children.find(
            (node): node is XmlDoctypeInterface => node.nodeType === XmlNodeType.DOCUMENT_TYPE,
        );
    }

    get rootElement(): XmlElementInterface {
        const rootElement = this.children.find(
            (node): node is XmlElementInterface => node.nodeType === XmlNodeType.ELEMENT,
        );
        if (!rootElement) {
            throw new Error('Document does not have a root element');
        }
        return rootElement;
    }

    get childElements(): XmlElementInterface[] {
        return this.children.filter(
            (node): node is XmlElementInterface => node.nodeType === XmlNodeType.ELEMENT,
        );
    }

    getElement(name: string): XmlElementInterface | undefined {
        return this.childElements.find(
            (element) => element.name.is(name),
        );
    }

    findElements(name: string): XmlElementInterface[] {
        const result: XmlElementInterface[] = [];
        for (const node of getDescendants(this)) {
            if (node.nodeType === XmlNodeType.ELEMENT && (node as XmlElementInterface).name.is(name)) {
                result.push(node as XmlElementInterface);
            }
        }
        return result;
    }

    findElement(name: string): XmlElementInterface | undefined {
        for (const node of getDescendants(this)) {
            if (node.nodeType === XmlNodeType.ELEMENT && (node as XmlElementInterface).name.is(name)) {
                return node as unknown as XmlElementInterface;
            }
        }
    }

    get firstChild(): XmlNodeInterface | undefined {
        return this.children[0];
    }

    get firstElementChild(): XmlElementInterface | undefined {
        return this.childElements[0];
    }

    get lastChild(): XmlNodeInterface | undefined {
        return this.children[this.children.length - 1];
    }

    get lastElementChild(): XmlElementInterface | undefined {
        return this.childElements[this.childElements.length - 1];
    }

    copy(): XmlDocumentInterface {
        return new XmlDocument(this.children.map((child) => child.copy()));
    }

    toXmlString(options: { pretty?: boolean; indent?: string; newLine?: string, entityMapping?: any } = {}): string {
        return this._nodeManager.toXmlString(this, options);
    }

    accept(visitor: XmlVisitorInterface): void {
        visitor.visitDocument(this);
    }
}

export { XmlDocument };