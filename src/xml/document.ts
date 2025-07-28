import {
    XmlDeclarationInterface,
    XmlDoctypeInterface,
    XmlElementInterface,
    XmlNodeInterface,
    XmlVisitorInterface,
} from './interfaces/index.js';
import { XmlNodeDecoder } from './parser/node_decoder.js';
import { XmlTokenizer } from './parser/tokenizer.js';
import { XmlNodeType } from './node_type.js';
import { NodeManager } from './node_manager.js';
import { getDescendants } from './utils/descendants.js';
import { DtdValidator } from './dtd/dtd_validator.js';
import { XmlDoctype } from './doctype.js';
import { XsdValidator } from './xsd/xsd_validator.js';
import { XmlElement } from './element.js';

class XmlDocument {
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
        return this.childElements.filter(
            (element) => element.name.is(name),
        );
    }

    findAllElements(name: string): XmlElementInterface[] {
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
                return node as XmlElementInterface;
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

    copy(): XmlDocument {
        return new XmlDocument(this.children.map((child) => child.copy()));
    }

    toXmlString(options: { pretty?: boolean; indent?: string; newLine?: string, entityMapping?: any } = {}): string {
        return this._nodeManager.toXmlString(this, options);
    }

    accept(visitor: XmlVisitorInterface): void {
        visitor.visitDocument(this);
    }

    validate(validator?: DtdValidator | XsdValidator): void {
        if (validator instanceof DtdValidator) {
            validator.validate(this);
        } else if (validator instanceof XsdValidator) {
            validator.validate(this.rootElement as XmlElement);
        } else if (this.doctype) {
            const dtdValidator = new DtdValidator(this.doctype as XmlDoctype);
            dtdValidator.validate(this);
        }
    }
}

export { XmlDocument };