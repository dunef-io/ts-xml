import { XmlAttributeType } from './attribute_type';
import { XmlName } from './name';
import { XmlNode } from './node';
import { XmlNodeType } from './node_type';

/**
 * XML attribute node.
 */
export interface XmlAttribute extends XmlNode {
    readonly nodeType: XmlNodeType.ATTRIBUTE;
    readonly name: XmlName;
    value: string;
    readonly attributeType: XmlAttributeType;

    copy(): XmlAttribute;
}