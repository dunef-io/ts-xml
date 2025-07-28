import { XmlEvent } from './event.js';
import { XmlNodeType } from '../node_type.js';
import { XmlEventAttribute } from './event_attribute.js';

/**
 * Event for an XML declaration.
 */
export interface XmlDeclarationEvent extends XmlEvent {
    readonly nodeType: XmlNodeType.DECLARATION;
    readonly attributes: XmlEventAttribute[];
}