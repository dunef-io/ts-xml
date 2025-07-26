import { XmlNodeType } from './node_type';
import { XmlVisitorInterface } from './interfaces/visitor';
import { XmlCommentInterface, XmlNodeInterface } from '@src/xml/interfaces';
import { NodeManager } from './node_manager';

export class XmlComment implements XmlCommentInterface {
    private readonly _nodeManager: NodeManager;

    constructor(public value: string) {
        this._nodeManager = new NodeManager(XmlNodeType.COMMENT);
    }

    get nodeType(): XmlNodeType.COMMENT {
        return XmlNodeType.COMMENT;
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

    copy(): XmlCommentInterface {
        return new XmlComment(this.value);
    }

    toXmlString(options: { pretty?: boolean; indent?: string; newLine?: string, entityMapping?: any } = {}): string {
        return this._nodeManager.toXmlString(this, options);
    }

    accept(visitor: XmlVisitorInterface): void {
        visitor.visitComment(this);
    }
}