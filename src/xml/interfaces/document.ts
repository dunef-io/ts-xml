import {
    XmlDeclarationInterface,
    XmlDoctypeInterface,
    XmlElementInterface,
    XmlNodeInterface,
    XmlVisitorInterface,
} from ".";
import { XmlNodeType } from "../node_type";

/**
 * XML document node.
 */
export interface XmlDocumentInterface extends XmlNodeInterface {
    readonly nodeType: XmlNodeType.DOCUMENT;
    readonly declaration: XmlDeclarationInterface | undefined;
    readonly doctype: XmlDoctypeInterface | undefined;
    readonly rootElement: XmlElementInterface;
    readonly children: XmlNodeInterface[];
    readonly childElements: XmlElementInterface[];
    getElement(name: string): XmlElementInterface | undefined;
    findElements(name: string): XmlElementInterface[];
    findAllElements(name: string): XmlElementInterface[];
    findElement(name: string): XmlElementInterface | undefined;
    readonly firstChild: XmlNodeInterface | undefined;
    readonly firstElementChild: XmlElementInterface | undefined;
    readonly lastChild: XmlNodeInterface | undefined;
    readonly lastElementChild: XmlElementInterface | undefined;

    copy(): XmlDocumentInterface;

    accept(visitor: XmlVisitorInterface): void;
}