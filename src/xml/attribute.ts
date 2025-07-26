import {
    XmlAttributeInterface,
    XmlNameInterface,
    XmlVisitorInterface,
    XmlNodeInterface
} from './interfaces';
import { XmlAttributeType } from './attribute_type';
import { XmlNodeType } from './node_type';
import { NodeManager } from './node_manager';

export class XmlAttribute implements XmlAttributeInterface {
    private readonly _nodeManager: NodeManager;

    constructor(
        readonly name: XmlNameInterface,
        public value: string,
        readonly attributeType: XmlAttributeType,
    ) {
        this._nodeManager = new NodeManager(XmlNodeType.ATTRIBUTE);
    }

    get nodeType(): XmlNodeType.ATTRIBUTE {
        return XmlNodeType.ATTRIBUTE;
    }

    get parentNode(): XmlNodeInterface | undefined {
        return this._nodeManager.parentNode;
    }

    set parentNode(parentNode: XmlNodeInterface | undefined) {
        this._nodeManager.parentNode = parentNode;
    }

    get innerText(): string {
        return this.value;
    }

    copy(): XmlAttributeInterface {
        return new XmlAttribute(this.name.copy(), this.value, this.attributeType);
    }

    toXmlString(options: { pretty?: boolean; indent?: string; newLine?: string, entityMapping?: any } = {}): string {
        return this._nodeManager.toXmlString(this, options);
    }

    accept(visitor: XmlVisitorInterface): void {
        visitor.visitAttribute(this);
    }
}