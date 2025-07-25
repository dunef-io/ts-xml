import { XmlAttributeType } from '../attribute_type';

export class XmlEventAttribute {
    constructor(
        readonly name: string,
        readonly value: string,
        readonly attributeType: XmlAttributeType,
    ) { }
}