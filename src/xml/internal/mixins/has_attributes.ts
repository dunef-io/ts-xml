import { XmlAttributeInterface } from '../../attribute';
import { XmlAttributeType } from '../../attribute_type';
import { XmlHasAttributesInterface } from '../../mixins/has_attributes';
import { XmlAttribute } from '../../attribute';
import { XmlSimpleName } from '../../name';

export class XmlHasAttributes implements XmlHasAttributesInterface {
    attributes!: XmlAttributeInterface[];

    getAttribute(name: string): string | undefined {
        const attribute = this.getAttributeNode(name);
        return attribute ? attribute.value : undefined;
    }

    getAttributeNode(name: string): XmlAttributeInterface | undefined {
        return this.attributes.find(
            (attribute) => attribute.name.qualified === name
        );
    }

    setAttribute(name: string, value: string): void {
        const attribute = this.getAttributeNode(name);
        if (attribute) {
            attribute.value = value;
        } else {
            this.attributes.push(
                new XmlAttribute(
                    new XmlSimpleName(name),
                    value,
                    XmlAttributeType.DOUBLE_QUOTE
                )
            );
        }
    }
}