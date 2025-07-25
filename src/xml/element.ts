import { XmlAttributeInterface } from './attribute';
import { XmlHasAttributes } from './internal/mixins/has_attributes';
import { XmlHasChildren } from './internal/mixins/has_children';
import { applyMixins } from './internal/utils/apply_mixins';
import { XmlHasAttributesInterface } from './mixins/has_attributes';
import { XmlHasChildrenInterface } from './mixins/has_children';
import { XmlNameInterface } from './name';
import { XmlNode, XmlNodeInterface } from './node';
import { XmlNodeType } from './node_type';
import { XmlVisitorInterface } from './visitor';

/**
 * XML element node.
 */
export interface XmlElementInterface
    extends XmlNodeInterface,
    XmlHasAttributesInterface,
    XmlHasChildrenInterface {
    readonly nodeType: XmlNodeType.ELEMENT;
    readonly name: XmlNameInterface;
    isSelfClosing: boolean;

    copy(): XmlElementInterface;
}

class XmlElement extends XmlNode implements XmlElementInterface {
    constructor(
        readonly name: XmlNameInterface,
        public attributes: XmlAttributeInterface[] = [],
        public children: XmlNodeInterface[] = [],
        public isSelfClosing: boolean = true,
    ) {
        super();
        this.attributes = attributes;
        this.children = children;
    }

    readonly nodeType: XmlNodeType.ELEMENT = XmlNodeType.ELEMENT;

    copy(): XmlElement {
        return new XmlElement(
            this.name.copy(),
            this.attributes.map((attribute) => attribute.copy()),
            this.children.map((child) => child.copy()),
            this.isSelfClosing,
        );
    }

    accept(visitor: XmlVisitorInterface): void {
        visitor.visitElement(this);
    }
}

interface XmlElement extends XmlHasAttributesInterface, XmlHasChildrenInterface { }
applyMixins(XmlElement, [XmlHasAttributes, XmlHasChildren]);

export { XmlElement };