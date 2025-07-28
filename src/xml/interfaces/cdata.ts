import { XmlNodeType } from "../node_type.js";
import { XmlNodeInterface, XmlVisitorInterface } from "./index.js";

/**
 * XML CDATA node.
 */
export interface XmlCDATAInterface extends XmlNodeInterface {
    readonly nodeType: XmlNodeType.CDATA;
    value: string;

    copy(): XmlCDATAInterface;

    accept(visitor: XmlVisitorInterface): void;
}