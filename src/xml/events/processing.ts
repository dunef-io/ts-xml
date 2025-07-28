import { XmlEvent } from './event.js';
import { XmlNodeType } from '../node_type.js';

/**
 * Event for an XML processing instruction.
 */
export interface XmlProcessingEvent extends XmlEvent {
    readonly nodeType: XmlNodeType.PROCESSING;
    readonly target: string;
    readonly value: string;
}