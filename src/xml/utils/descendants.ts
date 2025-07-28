import { XmlNodeInterface, XmlHasChildrenInterface } from '../interfaces/index.js';

export function* getDescendants(node: XmlNodeInterface): Iterable<XmlNodeInterface> {
    if ('children' in node) {
        for (const child of (node as unknown as XmlHasChildrenInterface).children) {
            yield child;
            yield* getDescendants(child);
        }
    }
}