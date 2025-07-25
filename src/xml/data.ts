import { XmlNode, XmlNodeInterface } from './node';
import { XmlVisitorInterface } from './visitor';

/**
 * Abstract XML data node.
 */
export interface XmlDataInterface extends XmlNodeInterface {
    /**
     * The textual value of this node.
     */
    value: string;
}

export abstract class XmlData extends XmlNode implements XmlDataInterface {
    constructor(public value: string) {
        super();
    }

    abstract accept(visitor: XmlVisitorInterface): void;
}