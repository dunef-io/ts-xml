import { XmlNodeType } from './node_type';

import { XmlHasVisitor } from './mixins/has_visitor';
import { XmlHasWriter } from './mixins/has_writer';

/**
 * Abstract XML node.
 */
export interface XmlNode extends XmlHasVisitor, XmlHasWriter {
    /**
     * Return the node type of this node.
       */
    readonly nodeType: XmlNodeType;

    /**
     * Return the parent node of this node, or `undefined` if there is none.
     */
    readonly parentNode: XmlNode | undefined;

    /**
     * Return a copy of this node and all its children.
     */
    copy(): XmlNode;
}