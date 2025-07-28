import { XmlNodeInterface, XmlVisitorInterface } from "./index.js";
import { XmlNodeType } from "../node_type.js";
import { DtdExternalId } from "./dtd.js";

/**
 * XML doctype node.
 */
export interface XmlDoctypeInterface extends XmlNodeInterface {
    readonly nodeType: XmlNodeType.DOCUMENT_TYPE;
    readonly name: string;
    readonly externalId: DtdExternalId | undefined;
    readonly internalSubset: string | undefined;

    copy(): XmlDoctypeInterface;

    accept(visitor: XmlVisitorInterface): void;
}