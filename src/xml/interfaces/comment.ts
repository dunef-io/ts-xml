import { XmlNodeInterface, XmlVisitorInterface } from ".";
import { XmlNodeType } from "../node_type";

/**
 * XML comment node.
 */
export interface XmlCommentInterface extends XmlNodeInterface {
    readonly nodeType: XmlNodeType.COMMENT;
    value: string;

    copy(): XmlCommentInterface;

    accept(visitor: XmlVisitorInterface): void;
}