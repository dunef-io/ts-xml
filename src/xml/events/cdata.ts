import { XmlEvent } from './event.js';
import { XmlNodeType } from '../node_type.js';

/**
 * Event for an XML CDATA node.
 */
export interface XmlCDATAEvent extends XmlEvent {
    readonly nodeType: XmlNodeType.CDATA;
    readonly value: string;
}