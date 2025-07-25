import { XmlData } from './data';
import { XmlNodeType } from './node_type';
import { XmlVisitorInterface } from './visitor';

/**
 * XML comment node.
 */
export interface XmlComment extends XmlData {
    readonly nodeType: XmlNodeType.COMMENT;

    copy(): XmlComment;
}

export class XmlComment extends XmlData implements XmlComment {
    readonly nodeType: XmlNodeType.COMMENT = XmlNodeType.COMMENT;

    copy(): XmlComment {
        return new XmlComment(this.value);
    }

    accept(visitor: XmlVisitorInterface): void {
        visitor.visitComment(this);
    }
}