import { XmlVisitorInterface } from './visitor';

export interface XmlHasVisitorInterface {
    accept(visitor: XmlVisitorInterface): void;
}