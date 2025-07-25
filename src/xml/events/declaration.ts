import { XmlEvent } from './event';
import { XmlNodeType } from '../node_type';
import { XmlEventAttribute } from './event_attribute';

/**
 * Event for an XML declaration.
 */
export interface XmlDeclarationEvent extends XmlEvent {
    readonly nodeType: XmlNodeType.DECLARATION;
    readonly attributes: XmlEventAttribute[];
}