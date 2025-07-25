import { XmlNodeType } from './node_type';

import { XmlHasVisitorInterface } from './mixins/has_visitor';
import { XmlHasWriterInterface } from './mixins/has_writer';
import { XmlVisitorInterface } from './visitor';
import { PrettyXmlWriter } from './pretty_writer';
import { XmlWriter } from './writer';

/**
 * Abstract XML node.
 */
export interface XmlNodeInterface extends XmlHasVisitorInterface, XmlHasWriterInterface {
  /**
   * Return the node type of this node.
     */
  readonly nodeType: XmlNodeType;

  /**
   * Return the parent node of this node, or `undefined` if there is none.
   */
  readonly parentNode: XmlNodeInterface | undefined;

  /**
   * Return a copy of this node and all its children.
   */
  copy(): XmlNodeInterface;
}

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

  toXmlString(options?: { pretty?: boolean }): string {
    const writer = options?.pretty
      ? new (PrettyXmlWriter)()
      : new (XmlWriter)();
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