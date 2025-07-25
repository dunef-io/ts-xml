import { XmlElementInterface } from '../element';
import { XmlNodeInterface } from '../node';

/**
 * Mixin for nodes with children.
 */
export interface XmlHasChildrenInterface {
    /**
     * Return the direct children of this node in document order.
     */
    readonly children: XmlNodeInterface[];

    /**
     * Return an [Iterable] over the [XmlElement] children of this node.
     */
    readonly childElements: XmlElementInterface[];

    /**
     * Return the first child element with the given `name`.
     */
    getElement(name: string): XmlElementInterface | undefined;

    /**
     * Return the first child of this node, or `undefined` if there are no children.
     */
    readonly firstChild: XmlNodeInterface | undefined;

    /**
     * Return the first child [XmlElement], or `undefined` if there are none.
     */
    readonly firstElementChild: XmlElementInterface | undefined;

    /**
     * Return the last child of this node, or `undefined` if there are no children.
     */
    readonly lastChild: XmlNodeInterface | undefined;

    /**
     * Return the last child [XmlElement], or `undefined` if there are none.
     */
    readonly lastElementChild: XmlElementInterface | undefined;
}