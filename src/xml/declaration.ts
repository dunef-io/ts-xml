import { XmlHasAttributes } from './mixins/has_attributes';
import { XmlNode } from './node';
import { XmlNodeType } from './node_type';

/**
 * XML document declaration.
 */
export interface XmlDeclaration extends XmlNode, XmlHasAttributes {
    readonly nodeType: XmlNodeType.DECLARATION;
    version: string | undefined;
    encoding: string | undefined;
    standalone: boolean | undefined;

    copy(): XmlDeclaration;
}