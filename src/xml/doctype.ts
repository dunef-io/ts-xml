import { XmlNode, XmlNodeInterface } from './node';
import { XmlNodeType } from './node_type';
import { XmlVisitorInterface } from './visitor';

/**
 * Placeholder for DTD external ID.
 */
export interface DtdExternalId { }

/**
 * XML doctype node.
 */
export interface XmlDoctypeInterface extends XmlNodeInterface {
    readonly nodeType: XmlNodeType.DOCUMENT_TYPE;
    readonly name: string;
    readonly externalId: DtdExternalId | undefined;
    readonly internalSubset: string | undefined;

    copy(): XmlDoctypeInterface;
}

export class XmlDoctype extends XmlNode implements XmlDoctypeInterface {
    constructor(
        readonly name: string,
        readonly externalId: DtdExternalId | undefined,
        readonly internalSubset: string | undefined,
    ) {
        super();
    }

    readonly nodeType: XmlNodeType.DOCUMENT_TYPE = XmlNodeType.DOCUMENT_TYPE;

    copy(): XmlDoctype {
        return new XmlDoctype(this.name, this.externalId, this.internalSubset);
    }

    accept(visitor: XmlVisitorInterface): void {
        visitor.visitDoctype(this);
    }
}