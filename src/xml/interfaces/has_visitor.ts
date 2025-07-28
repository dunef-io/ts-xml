import { XmlVisitorInterface } from './visitor.js';

export interface XmlHasVisitorInterface {
    accept(visitor: XmlVisitorInterface): void;
}