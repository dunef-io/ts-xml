import { XmlComment } from '../comment';
import { XmlNodeType } from '../node_type';
import { XmlDataImpl } from './data';

/**
 * XML comment node.
 */
export class XmlCommentImpl extends XmlDataImpl implements XmlComment {
    readonly nodeType: XmlNodeType.COMMENT = XmlNodeType.COMMENT;

    copy(): XmlComment {
        return new XmlCommentImpl(this.value);
    }

    accept(visitor: import('../visitor').XmlVisitor): void {
        visitor.visitComment(this);
    }
}