import { XmlAttribute } from '../attribute';
import { XmlAttributeType } from '../attribute_type';
import { XmlName } from '../name';
import { XmlNodeType } from '../node_type';
import { XmlNodeImpl } from './node';

/**
 * XML attribute node.
 */
export class XmlAttributeImpl extends XmlNodeImpl implements XmlAttribute {
    constructor(
        readonly name: XmlName,
        public value: string,
        readonly attributeType: XmlAttributeType,
    ) {
        super();
    }

    readonly nodeType: XmlNodeType.ATTRIBUTE = XmlNodeType.ATTRIBUTE;

    copy(): XmlAttribute {
        return new XmlAttributeImpl(this.name.copy(), this.value, this.attributeType);
    }

    accept(visitor: import('../visitor').XmlVisitor): void {
        visitor.visitAttribute(this);
    }
}