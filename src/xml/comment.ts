import { XmlData } from './data';
import { XmlNodeType } from './node_type';

/**
 * XML comment node.
 */
export interface XmlComment extends XmlData {
    readonly nodeType: XmlNodeType.COMMENT;

    copy(): XmlComment;
}