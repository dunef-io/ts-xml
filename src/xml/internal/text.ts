import { XmlNodeType } from '../node_type';
import { XmlText } from '../text';
import { XmlDataImpl } from './data';

/**
 * XML text node.
 */
export class XmlTextImpl extends XmlDataImpl implements XmlText {
    readonly nodeType: XmlNodeType.TEXT = XmlNodeType.TEXT;

    copy(): XmlText {
        return new XmlTextImpl(this.value);
    }

    accept(visitor: import('../visitor').XmlVisitor): void {
        visitor.visitText(this);
    }
}