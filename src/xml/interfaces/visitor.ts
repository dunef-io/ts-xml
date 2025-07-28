import { XmlProcessingInterface } from "./processing.js";
import {
    XmlAttributeInterface, XmlDeclarationInterface, XmlCDATAInterface, XmlElementInterface,
    XmlNameInterface, XmlDoctypeInterface,
} from './index.js';
import { XmlComment } from '../comment.js';
import { XmlElement } from '../element.js';
import { XmlTextInterface } from './text.js';
import { XmlDocument } from "../document.js";

export interface XmlVisitorInterface {
    visitName(name: XmlNameInterface): void;
    visitAttribute(node: XmlAttributeInterface): void;
    visitDeclaration(node: XmlDeclarationInterface): void;
    visitDocument(node: XmlDocument): void;
    visitElement(node: XmlElement): void;
    visitCDATA(node: XmlCDATAInterface): void;
    visitComment(node: XmlComment): void;
    visitDoctype(node: XmlDoctypeInterface): void;
    visitProcessing(node: XmlProcessingInterface): void;
    visitText(node: XmlTextInterface): void;
}