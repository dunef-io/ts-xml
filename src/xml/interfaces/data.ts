import { XmlNodeInterface, XmlVisitorInterface } from ".";
import { XmlNodeType } from "../node_type";

/**
 * Abstract XML data node.
 */
export interface XmlDataInterface extends XmlNodeInterface {
    readonly nodeType: XmlNodeType.TEXT | XmlNodeType.CDATA | XmlNodeType.COMMENT;
    value: string;

    copy(): XmlDataInterface;

    accept(visitor: XmlVisitorInterface): void;
}