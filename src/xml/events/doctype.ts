import { XmlEvent } from './event';
import { XmlNodeType } from '../node_type';

/**
 * Event for an XML doctype node.
 */
export interface XmlDoctypeEvent extends XmlEvent {
    readonly nodeType: XmlNodeType.DOCUMENT_TYPE;
    readonly name: string;
    readonly externalId?: any; // Placeholder for DtdExternalId
    readonly internalSubset?: string;
}