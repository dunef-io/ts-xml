import { XmlNodeInterface, XmlHasAttributesInterface } from "./index.js";
import { XmlNodeType } from "../node_type.js";

/**
 * XML document declaration.
 */
export interface XmlDeclarationInterface extends XmlNodeInterface, XmlHasAttributesInterface {
    readonly nodeType: XmlNodeType.DECLARATION;
    version: string | undefined;
    encoding: string | undefined;
    standalone: boolean | undefined;

    copy(): XmlDeclarationInterface;
}