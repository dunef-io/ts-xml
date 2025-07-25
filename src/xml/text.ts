import { XmlData } from './data';
import { XmlNodeType } from './node_type';

/**
 * XML text node.
 */
export interface XmlText extends XmlData {
    readonly nodeType: XmlNodeType.TEXT;

    copy(): XmlText;
}