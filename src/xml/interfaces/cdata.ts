import { XmlNodeType } from "../node_type";
import { XmlNodeInterface, XmlVisitorInterface } from "./index";

/**
 * XML CDATA node.
 */
export interface XmlCDATAInterface extends XmlNodeInterface {
    readonly nodeType: XmlNodeType.CDATA;
    value: string;

    copy(): XmlCDATAInterface;

    accept(visitor: XmlVisitorInterface): void;
}