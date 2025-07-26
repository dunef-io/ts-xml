import {
    XmlNodeInterface,
    XmlNameInterface,
    XmlAttributeInterface,
    XmlVisitorInterface,
} from ".";
import { XmlNodeType } from "../node_type";

/**
 * XML element node.
 */
export interface XmlElementInterface extends XmlNodeInterface {
    readonly nodeType: XmlNodeType.ELEMENT;
    readonly name: XmlNameInterface;
    isSelfClosing: boolean;
    attributes: XmlAttributeInterface[];
    children: XmlNodeInterface[];

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

    copy(): XmlElementInterface;

    accept(visitor: XmlVisitorInterface): void;
}