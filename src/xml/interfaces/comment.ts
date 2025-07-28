import { XmlNodeInterface, XmlVisitorInterface } from "./index.js";
import { XmlNodeType } from "../node_type.js";

/**
 * XML comment node.
 */
export interface XmlCommentInterface extends XmlNodeInterface {
    readonly nodeType: XmlNodeType.COMMENT;
    value: string;

    copy(): XmlCommentInterface;

    accept(visitor: XmlVisitorInterface): void;
}