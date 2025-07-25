import { XmlEvent } from './event';
import { XmlNodeType } from '../node_type';

/**
 * Event for an XML processing instruction.
 */
export interface XmlProcessingEvent extends XmlEvent {
    readonly nodeType: XmlNodeType.PROCESSING;
    readonly target: string;
    readonly value: string;
}