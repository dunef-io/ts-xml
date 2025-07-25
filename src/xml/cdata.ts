import { XmlData } from './data';
import { XmlNodeType } from './node_type';

/**
 * XML CDATA node.
 */
export interface XmlCDATA extends XmlData {
    readonly nodeType: XmlNodeType.CDATA;

    copy(): XmlCDATA;
}