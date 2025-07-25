import { XmlElement } from '../../element';
import { XmlHasChildren } from '../../mixins/has_children';
import { XmlNode } from '../../node';
import { XmlNodeType } from '../../node_type';

export class XmlHasChildrenImpl implements XmlHasChildren {
    children!: XmlNode[];

    get childElements(): XmlElement[] {
        return this.children.filter(
            (node): node is XmlElement => node.nodeType === XmlNodeType.ELEMENT,
        );
    }

    getElement(name: string): XmlElement | undefined {
        return this.childElements.find(
            (element) => element.name.qualified === name,
        );
    }

    get firstChild(): XmlNode | undefined {
        return this.children[0];
    }

    get firstElementChild(): XmlElement | undefined {
        return this.childElements[0];
    }

    get lastChild(): XmlNode | undefined {
        return this.children[this.children.length - 1];
    }

    get lastElementChild(): XmlElement | undefined {
        return this.childElements[this.childElements.length - 1];
    }
}