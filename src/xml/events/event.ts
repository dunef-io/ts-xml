import { XmlNodeType } from '../node_type';

/**
 * Abstract event that happens during parsing.
 */
export interface XmlEvent {
    readonly nodeType: XmlNodeType;
}