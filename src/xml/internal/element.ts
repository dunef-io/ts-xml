import { XmlElement } from '../element';
import { XmlName } from '../name';
import { XmlNode } from '../node';
import { XmlNodeType } from '../node_type';
import { XmlNodeImpl } from './node';
import { XmlHasChildrenImpl } from './mixins/has_children';
import { XmlHasAttributesImpl } from './mixins/has_attributes';
import { applyMixins } from './utils/apply_mixins';
import { XmlAttribute } from '../attribute';

/**
 * XML element node.
 */
class XmlElementImpl extends XmlNodeImpl implements XmlElement {
    constructor(
        readonly name: XmlName,
        public attributes: XmlAttribute[] = [],
        public children: XmlNode[] = [],
        public isSelfClosing: boolean = true,
    ) {
        super();
        this.attributes = attributes;
        this.children = children;
    }

    readonly nodeType: XmlNodeType.ELEMENT = XmlNodeType.ELEMENT;

    copy(): XmlElement {
        return new XmlElementImpl(
            this.name.copy(),
            this.attributes.map((attribute) => attribute.copy()),
            this.children.map((child) => child.copy()),
            this.isSelfClosing,
        );
    }

    accept(visitor: import('../visitor').XmlVisitor): void {
        visitor.visitElement(this);
    }
}

interface XmlElementImpl extends XmlHasAttributesImpl, XmlHasChildrenImpl { }
applyMixins(XmlElementImpl, [XmlHasAttributesImpl, XmlHasChildrenImpl]);

export { XmlElementImpl };