import { XmlAttributeType } from '../attribute_type.js';
import { DtdExternalId as DtdExternalIdInterface } from '../interfaces/index.js';
import { XmlToken } from '../utils/token.js';

export class DtdExternalId implements DtdExternalIdInterface {
    publicId?: string;
    publicIdType?: XmlAttributeType;
    systemId: string;
    systemIdType: XmlAttributeType;

    constructor(
        systemId: string,
        systemIdType: XmlAttributeType,
        publicId?: string,
        publicIdType?: XmlAttributeType,
    ) {
        this.systemId = systemId;
        this.systemIdType = systemIdType;
        this.publicId = publicId;
        this.publicIdType = publicIdType;
    }

    toString(): string {
        let buffer = '';
        if (this.publicId && this.publicIdType) {
            buffer += `${XmlToken.DOCTYPE_PUBLIC_ID} `;
            const publicIdQuote = this.getQuoteChar(this.publicIdType);
            buffer += `${publicIdQuote}${this.publicId}${publicIdQuote}`;
        } else {
            buffer += XmlToken.DOCTYPE_SYSTEM_ID;
        }
        const systemIdQuote = this.getQuoteChar(this.systemIdType);
        buffer += ` ${systemIdQuote}${this.systemId}${systemIdQuote}`;
        return buffer;
    }

    private getQuoteChar(attributeType: XmlAttributeType): string {
        switch (attributeType) {
            case XmlAttributeType.SINGLE_QUOTE:
                return XmlToken.SINGLE_QUOTE;
            case XmlAttributeType.DOUBLE_QUOTE:
                return XmlToken.DOUBLE_QUOTE;
        }
    }
}