import { XmlDataInterface, XmlNodeInterface } from './interfaces';
import { XmlNode } from './node';
import { XmlVisitorInterface } from './interfaces/visitor';

export abstract class XmlData implements XmlDataInterface {
    constructor(public value: string) { };

    abstract accept(visitor: XmlVisitorInterface): void;
}