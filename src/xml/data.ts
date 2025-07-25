import { XmlNode } from './node';

/**
 * Abstract XML data node.
 */
export interface XmlData extends XmlNode {
    /**
     * The textual value of this node.
     */
    value: string;
}