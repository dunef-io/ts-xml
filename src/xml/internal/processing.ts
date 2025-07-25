import { XmlNodeType } from '../node_type';
import { XmlProcessing } from '../processing';
import { XmlDataImpl } from './data';

/**
 * XML processing instruction.
 */
export class XmlProcessingImpl extends XmlDataImpl implements XmlProcessing {
    constructor(readonly target: string, public value: string) {
        super(value);
    }

    readonly nodeType: XmlNodeType.PROCESSING = XmlNodeType.PROCESSING;

    copy(): XmlProcessing {
        return new XmlProcessingImpl(this.target, this.value);
    }

    accept(visitor: import('../visitor').XmlVisitor): void {
        visitor.visitProcessing(this);
    }
}