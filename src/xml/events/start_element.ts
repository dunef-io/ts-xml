import { XmlEvent } from './event.js';
import { XmlNodeType } from '../node_type.js';
import { XmlEventAttribute } from './event_attribute.js';

/**
 * Event for an XML start element.
 */
export interface XmlStartElementEvent extends XmlEvent {
    readonly nodeType: XmlNodeType.ELEMENT;
    readonly name: string;
    readonly attributes: XmlEventAttribute[];
    readonly isSelfClosing: boolean;
}