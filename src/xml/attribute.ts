import { XmlAttributeType } from './attribute_type';
import { XmlNameInterface } from './name';
import { XmlNode, XmlNodeInterface } from './node';
import { XmlNodeType } from './node_type';
import { XmlVisitorInterface } from './visitor';

/**
 * XML attribute node.
 */
export interface XmlAttributeInterface extends XmlNodeInterface {
    readonly nodeType: XmlNodeType.ATTRIBUTE;
    readonly name: XmlNameInterface;
    value: string;
    readonly attributeType: XmlAttributeType;

    copy(): XmlAttributeInterface;
}

export class XmlAttribute extends XmlNode implements XmlAttributeInterface {
    constructor(
        readonly name: XmlNameInterface,
        public value: string,
        readonly attributeType: XmlAttributeType,
    ) {
        super();
    }

    readonly nodeType: XmlNodeType.ATTRIBUTE = XmlNodeType.ATTRIBUTE;

    copy(): XmlAttribute {
        return new XmlAttribute(this.name.copy(), this.value, this.attributeType);
    }

    accept(visitor: XmlVisitorInterface): void {
        visitor.visitAttribute(this);
    }
}