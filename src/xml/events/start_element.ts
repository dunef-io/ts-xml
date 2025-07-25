import { XmlEvent } from './event';
import { XmlNodeType } from '../node_type';
import { XmlEventAttribute } from './event_attribute';

/**
 * Event for an XML start element.
 */
export interface XmlStartElementEvent extends XmlEvent {
    readonly nodeType: XmlNodeType.ELEMENT;
    readonly name: string;
    readonly attributes: XmlEventAttribute[];
    readonly isSelfClosing: boolean;
}