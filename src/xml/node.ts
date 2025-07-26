import { XmlNodeInterface, XmlVisitorInterface } from '@src/xml/interfaces';
import { XmlNodeType } from './node_type';
import { getDescendants } from './utils/descendants';
import { XmlWriter } from './writer';
import { PrettyXmlWriter } from './pretty_writer';
import { StringBuffer } from './utils';
import { defaultEntityMapping } from './entities';

export abstract class XmlNode implements XmlNodeInterface {
  abstract readonly nodeType: XmlNodeType;
  private _parentNode: XmlNodeInterface | undefined;

  get parentNode(): XmlNodeInterface | undefined {
    return this._parentNode;
  }

  set parentNode(parentNode: XmlNodeInterface | undefined) {
    this._parentNode = parentNode;
  }

  abstract copy(): XmlNodeInterface;

  abstract accept(visitor: XmlVisitorInterface): void;

  toXmlString(options: { pretty?: boolean; indent?: string; newLine?: string, entityMapping?: any } = {}): string {
    const buffer = new StringBuffer();
    const writer = options.pretty
      ? new PrettyXmlWriter(buffer, options)
      : new XmlWriter(buffer, options.entityMapping ?? defaultEntityMapping);
    this.accept(writer);
    return writer.toString();
  }

  get innerText(): string {
    let text = '';
    for (const node of getDescendants(this as unknown as XmlNodeInterface)) {
      if (node.nodeType === XmlNodeType.TEXT || node.nodeType === XmlNodeType.CDATA) {
        text += (node as unknown as { value: string }).value;
      }
    }
    return text;
  }
}