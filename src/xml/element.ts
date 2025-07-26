import {
    XmlAttributeInterface, XmlNameInterface, XmlElementInterface, XmlVisitorInterface, XmlNodeInterface,
} from './interfaces';
import { XmlNodeType } from './node_type';
import { XmlAttribute } from './attribute';
import { XmlName } from './name';
import { XmlAttributeType } from './attribute_type';
import { getDescendants } from './utils/descendants';
import { NodeManager } from './node_manager';

class XmlElement implements XmlElementInterface {
    private readonly _nodeManager: NodeManager;

    constructor(
        readonly name: XmlNameInterface,
        public attributes: XmlAttributeInterface[] = [],
        public children: XmlNodeInterface[] = [],
        public isSelfClosing: boolean = true,
    ) {
        this._nodeManager = new NodeManager(XmlNodeType.ELEMENT);
    }

    get nodeType(): XmlNodeType.ELEMENT {
        return XmlNodeType.ELEMENT;
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

    copy(): XmlElementInterface {
        return new XmlElement(
            this.name.copy(),
            this.attributes.map((attribute) => attribute.copy()),
            this.children.map((child) => child.copy()),
            this.isSelfClosing,
        );
    }

    toXmlString(options: { pretty?: boolean; indent?: string; newLine?: string, entityMapping?: any } = {}): string {
        return this._nodeManager.toXmlString(this, options);
    }

    accept(visitor: XmlVisitorInterface): void {
        visitor.visitElement(this);
    }
}

export { XmlElement };