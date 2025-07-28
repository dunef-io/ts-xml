import { XmlEvent } from './event.js';
import { XmlNodeType } from '../node_type.js';

/**
 * Event for an XML end element.
 */
export interface XmlEndElementEvent extends XmlEvent {
    readonly nodeType: XmlNodeType.ELEMENT;
    readonly name: string;
}