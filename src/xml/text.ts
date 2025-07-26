import { XmlNodeType } from './node_type';
import { XmlVisitorInterface } from './interfaces/visitor';
import { XmlTextInterface, XmlNodeInterface } from '@src/xml/interfaces';
import { NodeManager } from './node_manager';
import { StringBuffer } from "@src/xml/utils";
import { defaultEntityMapping } from "@src/xml/entities";
import { PrettyXmlWriter, XmlWriter } from "@src/xml";

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