import { XmlEvent } from './event';
import { XmlNodeType } from '../node_type';

/**
 * Event for an XML end element.
 */
export interface XmlEndElementEvent extends XmlEvent {
    readonly nodeType: XmlNodeType.ELEMENT;
    readonly name: string;
}