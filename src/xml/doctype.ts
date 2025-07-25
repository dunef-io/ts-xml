import { XmlNode } from './node';
import { XmlNodeType } from './node_type';

/**
 * Placeholder for DTD external ID.
 */
export interface DtdExternalId { }

/**
 * XML doctype node.
 */
export interface XmlDoctype extends XmlNode {
    readonly nodeType: XmlNodeType.DOCUMENT_TYPE;
    readonly name: string;
    readonly externalId: DtdExternalId | undefined;
    readonly internalSubset: string | undefined;

    copy(): XmlDoctype;
}