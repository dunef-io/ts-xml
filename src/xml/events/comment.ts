import { XmlEvent } from './event.js';
import { XmlNodeType } from '../node_type.js';

/**
 * Event for an XML comment node.
 */
export interface XmlCommentEvent extends XmlEvent {
    readonly nodeType: XmlNodeType.COMMENT;
    readonly value: string;
}