import { XmlDeclaration } from './declaration';
import { XmlDoctype } from './doctype';
import { XmlElement } from './element';
import { XmlHasChildren } from './mixins/has_children';
import { XmlNode } from './node';
import { XmlNodeType } from './node_type';

/**
 * XML document node.
 */
export interface XmlDocument extends XmlNode, XmlHasChildren {
    readonly nodeType: XmlNodeType.DOCUMENT;
    readonly declaration: XmlDeclaration | undefined;
    readonly doctype: XmlDoctype | undefined;
    readonly rootElement: XmlElement;

    copy(): XmlDocument;
}