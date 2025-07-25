import { XmlElement } from '../element';
import { XmlNode } from '../node';

/**
 * Mixin for nodes with children.
 */
export interface XmlHasChildren {
    /**
     * Return the direct children of this node in document order.
     */
    readonly children: XmlNode[];

    /**
     * Return an [Iterable] over the [XmlElement] children of this node.
     */
    readonly childElements: XmlElement[];

    /**
     * Return the first child element with the given `name`.
     */
    getElement(name: string): XmlElement | undefined;

    /**
     * Return the first child of this node, or `undefined` if there are no children.
     */
    readonly firstChild: XmlNode | undefined;

    /**
     * Return the first child [XmlElement], or `undefined` if there are none.
     */
    readonly firstElementChild: XmlElement | undefined;

    /**
     * Return the last child of this node, or `undefined` if there are no children.
     */
    readonly lastChild: XmlNode | undefined;

    /**
     * Return the last child [XmlElement], or `undefined` if there are none.
     */
    readonly lastElementChild: XmlElement | undefined;
}