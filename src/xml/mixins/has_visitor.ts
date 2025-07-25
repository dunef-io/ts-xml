import { XmlVisitor } from '../visitor';

export interface XmlHasVisitor {
    accept(visitor: XmlVisitor): void;
}