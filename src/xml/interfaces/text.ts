import { XmlNodeType } from "../node_type";
import { XmlNodeInterface, XmlVisitorInterface } from "./index";

/**
 * XML text node.
 */
export interface XmlTextInterface extends XmlNodeInterface {
    readonly nodeType: XmlNodeType.TEXT;
    value: string;

    copy(): XmlTextInterface;

    accept(visitor: XmlVisitorInterface): void;
}