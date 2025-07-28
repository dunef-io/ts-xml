import { XmlNameInterface, XmlNodeInterface, XmlVisitorInterface } from "./index.js";
import { XmlAttributeType } from "../attribute_type.js";
import { XmlNodeType } from "../node_type.js";

/**
 * XML attribute node.
 */
export interface XmlAttributeInterface extends XmlNodeInterface {
    readonly nodeType: XmlNodeType.ATTRIBUTE;
    readonly name: XmlNameInterface;
    value: string;
    readonly attributeType: XmlAttributeType;

    copy(): XmlAttributeInterface;

    accept(visitor: XmlVisitorInterface): void;
}