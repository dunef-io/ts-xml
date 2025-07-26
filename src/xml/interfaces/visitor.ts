import { XmlProcessingInterface } from "./processing";
import {
    XmlAttributeInterface, XmlDeclarationInterface, XmlDocumentInterface, XmlCDATAInterface, XmlElementInterface,
    XmlNameInterface, XmlDoctypeInterface,
} from '.';
import { XmlComment } from '@src/xml/comment';
import { XmlText } from '@src/xml/text';
import { XmlElement } from '../element';
import { XmlTextInterface } from './text';

export interface XmlVisitorInterface {
    visitName(name: XmlNameInterface): void;
    visitAttribute(node: XmlAttributeInterface): void;
    visitDeclaration(node: XmlDeclarationInterface): void;
    visitDocument(node: XmlDocumentInterface): void;
    visitElement(node: XmlElement): void;
    visitCDATA(node: XmlCDATAInterface): void;
    visitComment(node: XmlComment): void;
    visitDoctype(node: XmlDoctypeInterface): void;
    visitProcessing(node: XmlProcessingInterface): void;
    visitText(node: XmlTextInterface): void;
}