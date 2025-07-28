import { XmlAttributeType } from '../attribute_type.js';

export interface DtdExternalId {
    publicId?: string;
    publicIdType?: XmlAttributeType;
    systemId: string;
    systemIdType: XmlAttributeType;
}