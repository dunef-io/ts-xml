import { XmlNodeInterface, XmlVisitorInterface } from "./index.js";
import { XmlNodeType } from "../node_type.js";

/**
 * Abstract XML data node.
 */
export interface XmlDataInterface extends XmlNodeInterface {
    readonly nodeType: XmlNodeType.TEXT | XmlNodeType.CDATA | XmlNodeType.COMMENT;
    value: string;

    copy(): XmlDataInterface;

    accept(visitor: XmlVisitorInterface): void;
}