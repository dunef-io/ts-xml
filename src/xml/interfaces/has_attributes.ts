import { XmlAttributeInterface } from "./attribute";

export interface XmlHasAttributesInterface {
    attributes: XmlAttributeInterface[];

    /**
     * Return the attribute value with the given `name`, or `null` if it does not exist
     */
    getAttribute(name: string): string | null;

    /**
     * Return the attribute node with the given `name`, or `null` if it does not exist
     */
    getAttributeNode(name: string): XmlAttributeInterface | null;

    /**
     * Set an attribute with the given `name` and `value`.
     */
    setAttribute(name: string, value: string): void;

    /**
     * Remove an attribute with the given `name`.
     */
    removeAttribute(name: string): void;
}