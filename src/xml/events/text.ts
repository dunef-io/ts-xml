import { XmlEvent } from './event.js';
import { XmlNodeType } from '../node_type.js';

/**
 * Event for an XML text node.
 */
export interface XmlTextEvent extends XmlEvent {
    readonly nodeType: XmlNodeType.TEXT;
    readonly value: string;
}