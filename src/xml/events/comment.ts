import { XmlEvent } from './event';
import { XmlNodeType } from '../node_type';

/**
 * Event for an XML comment node.
 */
export interface XmlCommentEvent extends XmlEvent {
    readonly nodeType: XmlNodeType.COMMENT;
    readonly value: string;
}