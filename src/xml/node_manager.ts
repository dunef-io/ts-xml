import { XmlNodeInterface, XmlVisitorInterface } from '@src/xml/interfaces';
import { XmlNodeType } from './node_type';
import { getDescendants } from './utils/descendants';
import { XmlWriter } from './writer';
import { PrettyXmlWriter } from './pretty_writer';
import { StringBuffer } from './utils';
import { defaultEntityMapping } from './entities';

export class NodeManager {
    private _parentNode: XmlNodeInterface | undefined;

    constructor(public nodeType: XmlNodeType) { }

    get parentNode(): XmlNodeInterface | undefined {
        return this._parentNode;
    }

    set parentNode(parentNode: XmlNodeInterface | undefined) {
        this._parentNode = parentNode;
    }

    toXmlString(node: XmlNodeInterface, options: { pretty?: boolean; indent?: string; newLine?: string, entityMapping?: any } = {}): string {
        const buffer = new StringBuffer();
        const writer = options.pretty
            ? new PrettyXmlWriter(buffer, options)
            : new XmlWriter(buffer, options.entityMapping ?? defaultEntityMapping);
        node.accept(writer);
        return writer.toString();
    }

    getInnerText(node: XmlNodeInterface): string {
        let text = '';
        for (const child of getDescendants(node)) {
            if (child.nodeType === XmlNodeType.TEXT || child.nodeType === XmlNodeType.CDATA) {
                text += (child as unknown as { value: string }).value;
            }
        }
        return text;
    }
}