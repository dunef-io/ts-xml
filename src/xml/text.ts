import { XmlNodeType } from './node_type.js';
import { XmlVisitorInterface } from './interfaces/visitor.js';
import { XmlTextInterface, XmlNodeInterface } from './interfaces/index.js';
import { NodeManager } from './node_manager.js';
import { StringBuffer } from "./utils/index.js";
import { defaultEntityMapping } from "./entities/index.js";
import { PrettyXmlWriter, XmlWriter } from "./index.js";

export class XmlText implements XmlTextInterface {
    private readonly _nodeManager: NodeManager;

    constructor(public value: string) {
        this._nodeManager = new NodeManager(XmlNodeType.TEXT);
    }

    get nodeType(): XmlNodeType.TEXT {
        return XmlNodeType.TEXT;
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

    copy(): XmlTextInterface {
        return new XmlText(this.value);
    }

    toXmlString(options: { pretty?: boolean; indent?: string; newLine?: string, entityMapping?: any } = {}): string {
        return this._nodeManager.toXmlString(this, options);
    }

    accept(visitor: XmlVisitorInterface): void {
        visitor.visitText(this);
    }
}