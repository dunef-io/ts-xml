import { XmlAttribute } from '../attribute';

/**
 * Mixin for nodes with attributes.
 */
export interface XmlHasAttributes {
    /**
     * Return the attribute nodes of this node in document order.
     */
    readonly attributes: XmlAttribute[];

    /**
     * Return the attribute value with the given `name`.
     */
    getAttribute(name: string): string | undefined;

    /**
     * Return the attribute node with the given `name`.
     */
    getAttributeNode(name: string): XmlAttribute | undefined;

    /**
     * Set the attribute value with the given `name` to `value`.
     * If an attribute with the name already exist, its value is updated.
     */
    setAttribute(name: string, value: string): void;
}