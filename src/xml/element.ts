import { XmlHasAttributes } from './mixins/has_attributes';
import { XmlHasChildren } from './mixins/has_children';
import { XmlName } from './name';
import { XmlNode } from './node';
import { XmlNodeType } from './node_type';

/**
 * XML element node.
 */
export interface XmlElement
    extends XmlNode,
    XmlHasAttributes,
    XmlHasChildren {
    readonly nodeType: XmlNodeType.ELEMENT;
    readonly name: XmlName;
    isSelfClosing: boolean;

    copy(): XmlElement;
}