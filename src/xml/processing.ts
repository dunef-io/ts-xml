import { XmlData } from './data';
import { XmlNodeType } from './node_type';

/**
 * XML processing instruction.
 */
export interface XmlProcessing extends XmlData {
    readonly nodeType: XmlNodeType.PROCESSING;
    readonly target: string;

    copy(): XmlProcessing;
}