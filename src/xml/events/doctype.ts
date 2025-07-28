import { XmlEvent } from './event.js';
import { XmlNodeType } from '../node_type.js';

/**
 * Event for an XML doctype node.
 */
export interface XmlDoctypeEvent extends XmlEvent {
    readonly nodeType: XmlNodeType.DOCUMENT_TYPE;
    readonly name: string;
    readonly externalId?: any; // Placeholder for DtdExternalId
    readonly internalSubset?: string;
}