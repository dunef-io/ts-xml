import { XmlNameInterface, XmlNodeInterface, XmlVisitorInterface } from ".";
import { XmlAttributeType } from "../attribute_type";
import { XmlNodeType } from "../node_type";

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