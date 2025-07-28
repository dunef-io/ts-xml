import { XmlNodeType } from "../node_type.js";
import { XmlVisitorInterface } from "./visitor.js";

/**
 * Abstract XML node.
 */
export interface XmlNodeInterface {
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

  /**
   * Return the concatenated text of this node and all its descendants.
   */
  readonly innerText: string;

  /**
   * Return an XML string representation of this node.
   *
   * If `pretty` is `true`, the output is nicely indented, otherwise a
   * single line is returned.
   *
   * The `indent` string is used to indent the output, but only if `pretty` is
   * `true`.
   *
   * The `newLine` string is used to break lines, but only if `pretty` is
   * `true`.
   */
  toXmlString(options?: { pretty?: boolean; indent?: string; newLine?: string, entityMapping?: any }): string;

  /**
   * Accept a visitor.
   */
  accept(visitor: XmlVisitorInterface): void;
}