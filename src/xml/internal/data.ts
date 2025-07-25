import { XmlData } from '../data';
import { XmlNodeImpl } from './node';

/**
 * Abstract XML data node.
 */
export abstract class XmlDataImpl extends XmlNodeImpl implements XmlData {
    constructor(public value: string) {
        super();
    }

    abstract accept(visitor: import('../visitor').XmlVisitor): void;
}