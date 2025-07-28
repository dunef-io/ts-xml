import { XmlNodeType } from '../node_type.js';

/**
 * Abstract event that happens during parsing.
 */
export interface XmlEvent {
    readonly nodeType: XmlNodeType;
}