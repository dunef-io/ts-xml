import {
    XmlAttributeInterface,
    XmlDeclarationInterface,
    XmlVisitorInterface,
    XmlNodeInterface,
} from './interfaces/index.js';
import { XmlNodeType } from './node_type.js';
import { NodeManager } from './node_manager.js';
import { XmlAttribute } from './attribute.js';
import { XmlName } from './name.js';
import { XmlAttributeType } from './attribute_type.js';

const versionAttribute = 'version';
const encodingAttribute = 'encoding';
const standaloneAttribute = 'standalone';

class XmlDeclaration implements XmlDeclarationInterface {
    private readonly _nodeManager: NodeManager;

    constructor(public attributes: XmlAttributeInterface[] = []) {
        this._nodeManager = new NodeManager(XmlNodeType.DECLARATION);
    }

    get nodeType(): XmlNodeType.DECLARATION {
        return XmlNodeType.DECLARATION;
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

    get version(): string | undefined {
        return this.getAttribute(versionAttribute) ?? undefined;
    }

    set version(value: string | undefined) {
        this.setAttribute(versionAttribute, value || '');
    }

    get encoding(): string | undefined {
        return this.getAttribute(encodingAttribute) ?? undefined;
    }

    set encoding(value: string | undefined) {
        this.setAttribute(encodingAttribute, value || '');
    }

    get standalone(): boolean | undefined {
        const value = this.getAttribute(standaloneAttribute);
        return value ? value === 'yes' : undefined;
    }

    set standalone(value: boolean | undefined) {
        this.setAttribute(standaloneAttribute, value ? 'yes' : 'no');
    }

    getAttribute(name: string): string | null {
        const attribute = this.getAttributeNode(name);
        return attribute ? attribute.value : null;
    }

    getAttributeNode(name: string): XmlAttributeInterface | null {
        return this.attributes.find((attribute) => attribute.name.is(name)) ?? null;
    }

    setAttribute(name: string, value: string): void {
        const attribute = this.getAttributeNode(name);
        if (attribute) {
            attribute.value = value;
        } else {
            this.attributes.push(new XmlAttribute(XmlName.fromString(name), value, XmlAttributeType.SINGLE_QUOTE));
        }
    }

    removeAttribute(name: string): void {
        this.attributes = this.attributes.filter((attribute) => !attribute.name.is(name));
    }

    copy(): XmlDeclarationInterface {
        return new XmlDeclaration(
            this.attributes.map((attribute) => attribute.copy()),
        );
    }

    toXmlString(options: { pretty?: boolean; indent?: string; newLine?: string, entityMapping?: any } = {}): string {
        return this._nodeManager.toXmlString(this, options);
    }

    accept(visitor: XmlVisitorInterface): void {
        visitor.visitDeclaration(this);
    }
}

export { XmlDeclaration };