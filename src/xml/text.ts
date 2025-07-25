import { XmlData } from './data';
import { XmlNodeType } from './node_type';
import { XmlVisitorInterface } from './visitor';

/**
 * XML text node.
 */
export interface XmlText extends XmlData {
    readonly nodeType: XmlNodeType.TEXT;

    copy(): XmlText;
}

export class XmlText extends XmlData implements XmlText {
    readonly nodeType: XmlNodeType.TEXT = XmlNodeType.TEXT;

    copy(): XmlText {
        return new XmlText(this.value);
    }

    accept(visitor: XmlVisitorInterface): void {
        visitor.visitText(this);
    }
}