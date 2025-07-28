import {
    DtdExternalId,
    XmlDoctypeInterface,
    XmlVisitorInterface,
    XmlNodeInterface,
} from './interfaces/index.js';
import { XmlNodeType } from './node_type.js';
import { NodeManager } from './node_manager.js';

export class XmlDoctype implements XmlDoctypeInterface {
    private readonly _nodeManager: NodeManager;

    constructor(
        readonly name: string,
        readonly externalId: DtdExternalId | undefined,
        readonly internalSubset: string | undefined,
    ) {
        this._nodeManager = new NodeManager(XmlNodeType.DOCUMENT_TYPE);
    }

    get nodeType(): XmlNodeType.DOCUMENT_TYPE {
        return XmlNodeType.DOCUMENT_TYPE;
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

    copy(): XmlDoctypeInterface {
        return new XmlDoctype(this.name, this.externalId, this.internalSubset);
    }

    toXmlString(options: { pretty?: boolean; indent?: string; newLine?: string, entityMapping?: any } = {}): string {
        return this._nodeManager.toXmlString(this, options);
    }

    accept(visitor: XmlVisitorInterface): void {
        visitor.visitDoctype(this);
    }
}