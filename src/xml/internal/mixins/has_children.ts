import { XmlElementInterface } from '../../element';
import { XmlHasChildrenInterface } from '../../mixins/has_children';
import { XmlNodeInterface } from '../../node';
import { XmlNodeType } from '../../node_type';

export class XmlHasChildren implements XmlHasChildrenInterface {
    children!: XmlNodeInterface[];

    get childElements(): XmlElementInterface[] {
        return this.children.filter(
            (node): node is XmlElementInterface => node.nodeType === XmlNodeType.ELEMENT,
        );
    }

    getElement(name: string): XmlElementInterface | undefined {
        return this.childElements.find(
            (element) => element.name.qualified === name,
        );
    }

    get firstChild(): XmlNodeInterface | undefined {
        return this.children[0];
    }

    get firstElementChild(): XmlElementInterface | undefined {
        return this.childElements[0];
    }

    get lastChild(): XmlNodeInterface | undefined {
        return this.children[this.children.length - 1];
    }

    get lastElementChild(): XmlElementInterface | undefined {
        return this.childElements[this.childElements.length - 1];
    }
}