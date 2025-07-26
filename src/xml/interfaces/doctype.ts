import { XmlNodeInterface, XmlVisitorInterface } from ".";
import { XmlNodeType } from "../node_type";
import { DtdExternalId } from "./dtd";

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