import { DtdExternalId, XmlDoctype } from '../doctype';
import { XmlNodeType } from '../node_type';
import { XmlNodeImpl } from './node';

/**
 * XML doctype node.
 */
export class XmlDoctypeImpl extends XmlNodeImpl implements XmlDoctype {
    constructor(
        readonly name: string,
        readonly externalId: DtdExternalId | undefined,
        readonly internalSubset: string | undefined,
    ) {
        super();
    }

    readonly nodeType: XmlNodeType.DOCUMENT_TYPE = XmlNodeType.DOCUMENT_TYPE;

    copy(): XmlDoctype {
        return new XmlDoctypeImpl(this.name, this.externalId, this.internalSubset);
    }

    accept(visitor: import('../visitor').XmlVisitor): void {
        visitor.visitDoctype(this);
    }
}