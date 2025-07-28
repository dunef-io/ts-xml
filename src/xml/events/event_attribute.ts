import { XmlAttributeType } from '../attribute_type.js';

export class XmlEventAttribute {
    constructor(
        readonly name: string,
        readonly value: string,
        readonly attributeType: XmlAttributeType,
    ) { }
}