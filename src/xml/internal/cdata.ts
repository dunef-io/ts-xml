import { XmlCDATA } from '../cdata';
import { XmlNodeType } from '../node_type';
import { XmlDataImpl } from './data';

/**
 * XML CDATA node.
 */
export class XmlCDATAImpl extends XmlDataImpl implements XmlCDATA {
    readonly nodeType: XmlNodeType.CDATA = XmlNodeType.CDATA;

    copy(): XmlCDATA {
        return new XmlCDATAImpl(this.value);
    }

    accept(visitor: import('../visitor').XmlVisitor): void {
        visitor.visitCDATA(this);
    }
}