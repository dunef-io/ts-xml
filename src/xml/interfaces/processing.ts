import { XmlNodeInterface, XmlVisitorInterface } from "./index.js";
import { XmlNodeType } from "../node_type.js";

/**
 * XML processing instruction.
 */
export interface XmlProcessingInterface extends XmlNodeInterface {
    readonly nodeType: XmlNodeType.PROCESSING;
    readonly target: string;
    value: string;

    copy(): XmlProcessingInterface;

    accept(visitor: XmlVisitorInterface): void;
}