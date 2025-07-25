import { XmlEvent } from './event';
import { XmlNodeType } from '../node_type';

/**
 * Event for an XML text node.
 */
export interface XmlTextEvent extends XmlEvent {
    readonly nodeType: XmlNodeType.TEXT;
    readonly value: string;
}