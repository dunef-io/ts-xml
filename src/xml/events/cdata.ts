import { XmlEvent } from './event';
import { XmlNodeType } from '../node_type';

/**
 * Event for an XML CDATA node.
 */
export interface XmlCDATAEvent extends XmlEvent {
    readonly nodeType: XmlNodeType.CDATA;
    readonly value: string;
}