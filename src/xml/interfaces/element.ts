import {
    XmlNodeInterface,
    XmlNameInterface,
    XmlAttributeInterface,
    XmlVisitorInterface,
} from "./index.js";
import { XmlNodeType } from "../node_type.js";

/**
 * XML element node.
 */
export interface XmlElementInterface extends XmlNodeInterface {
    readonly nodeType: XmlNodeType.ELEMENT;
    readonly name: XmlNameInterface;
    isSelfClosing: boolean;
    attributes: XmlAttributeInterface[];
    children: XmlNodeInterface[];
    readonly childElements: XmlElementInterface[];

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

    getElement(name: string): XmlElementInterface | undefined;
    findElements(name: string): XmlElementInterface[];
    findAllElements(name: string): XmlElementInterface[];
    readonly lastChild: XmlNodeInterface | undefined;
    readonly lastElementChild: XmlElementInterface | undefined;

    copy(): XmlElementInterface;

    accept(visitor: XmlVisitorInterface): void;
}