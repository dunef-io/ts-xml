import { XmlNodeType } from './node_type.js';
import { XmlVisitorInterface } from './interfaces/visitor.js';
import { XmlCDATAInterface, XmlNodeInterface } from './interfaces/index.js';
import { NodeManager } from './node_manager.js';

export class XmlCDATA implements XmlCDATAInterface {
    private readonly _nodeManager: NodeManager;

    constructor(public value: string) {
        this._nodeManager = new NodeManager(XmlNodeType.CDATA);
    }

    get nodeType(): XmlNodeType.CDATA {
        return XmlNodeType.CDATA;
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

    copy(): XmlCDATAInterface {
        return new XmlCDATA(this.value);
    }

    toXmlString(options: { pretty?: boolean; indent?: string; newLine?: string, entityMapping?: any } = {}): string {
        return this._nodeManager.toXmlString(this, options);
    }

    accept(visitor: XmlVisitorInterface): void {
        visitor.visitCDATA(this);
    }
}