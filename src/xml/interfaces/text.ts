import { XmlNodeType } from "../node_type.js";
import { XmlNodeInterface, XmlVisitorInterface } from "./index.js";

/**
 * XML text node.
 */
export interface XmlTextInterface extends XmlNodeInterface {
    readonly nodeType: XmlNodeType.TEXT;
    value: string;

    copy(): XmlTextInterface;

    accept(visitor: XmlVisitorInterface): void;
}