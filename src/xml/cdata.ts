import { XmlData, XmlDataInterface } from './data';
import { XmlNodeType } from './node_type';
import { XmlVisitorInterface } from './visitor';

/**
 * XML CDATA node.
 */
export interface XmlCDATAInterface extends XmlDataInterface {
    readonly nodeType: XmlNodeType.CDATA;

    copy(): XmlCDATAInterface;
}

export class XmlCDATA extends XmlData implements XmlCDATA {
    readonly nodeType: XmlNodeType.CDATA = XmlNodeType.CDATA;

    copy(): XmlCDATA {
        return new XmlCDATA(this.value);
    }

    accept(visitor: XmlVisitorInterface): void {
        visitor.visitCDATA(this);
    }
}