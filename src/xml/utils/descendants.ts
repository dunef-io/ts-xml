import { XmlNode } from '../node';

export function* getDescendants(node: XmlNode): Iterable<XmlNode> {
    if ('children' in node) {
        for (const child of (node as any).children) {
            yield child;
            yield* getDescendants(child);
        }
    }
}