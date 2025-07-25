import { XmlNode } from '../node';
import { XmlNodeType } from '../node_type';

/**
 * Abstract XML node.
 */
export abstract class XmlNodeImpl implements XmlNode {
    abstract readonly nodeType: XmlNodeType;
    private _parentNode: XmlNode | undefined;

    get parentNode(): XmlNode | undefined {
        return this._parentNode;
    }

    set parentNode(parentNode: XmlNode | undefined) {
        this._parentNode = parentNode;
    }

    abstract copy(): XmlNode;

    abstract accept(visitor: import('../visitor').XmlVisitor): void;

    toXmlString(options?: { pretty?: boolean }): string {
        const writer = options?.pretty
            ? new (require('../pretty_writer').PrettyXmlWriter)(options)
            : new (require('../writer').XmlWriter)();
        this.accept(writer);
        return writer.toString();
    }

    get innerText(): string {
        const descendants = require('../utils/descendants').getDescendants(this);
        let text = '';
        for (const node of descendants) {
            if (node.nodeType === 8 || node.nodeType === 1) { // TEXT or CDATA
                text += (node as any).value;
            }
        }
        return text;
    }
}