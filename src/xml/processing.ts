import { XmlData, XmlDataInterface } from './data';
import { XmlNodeType } from './node_type';
import { XmlVisitorInterface } from './visitor';

/**
 * XML processing instruction.
 */
export interface XmlProcessingInterface extends XmlDataInterface {
    readonly nodeType: XmlNodeType.PROCESSING;
    readonly target: string;

    copy(): XmlProcessingInterface;
}

export class XmlProcessing extends XmlData implements XmlProcessingInterface {
    constructor(readonly target: string, public value: string) {
        super(value);
    }

    readonly nodeType: XmlNodeType.PROCESSING = XmlNodeType.PROCESSING;

    copy(): XmlProcessing {
        return new XmlProcessing(this.target, this.value);
    }

    accept(visitor: XmlVisitorInterface): void {
        visitor.visitProcessing(this);
    }
}