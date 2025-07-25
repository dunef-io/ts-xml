import { XmlAttribute } from '../../attribute';
import { XmlAttributeType } from '../../attribute_type';
import { XmlHasAttributes } from '../../mixins/has_attributes';
import { XmlAttributeImpl } from '../attribute';
import { XmlSimpleName } from '../name';

export class XmlHasAttributesImpl implements XmlHasAttributes {
    attributes!: XmlAttribute[];

    getAttribute(name: string): string | undefined {
        const attribute = this.getAttributeNode(name);
        return attribute ? attribute.value : undefined;
    }

    getAttributeNode(name: string): XmlAttribute | undefined {
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
                new XmlAttributeImpl(
                    new XmlSimpleName(name),
                    value,
                    XmlAttributeType.DOUBLE_QUOTE
                )
            );
        }
    }
}