import {
    XmlNameInterface, XmlNodeInterface, XmlAttributeInterface,
} from './interfaces/index.js';
import { XmlAttribute } from './attribute.js';
import { XmlAttributeType } from './attribute_type.js';
import { XmlDocument } from './document.js';
import { XmlElement } from './element.js';
import { XmlName, } from './name.js';
import { XmlProcessing } from './processing.js';
import { XmlText } from './text.js';

class NodeBuilder {
    attributes: XmlAttribute[] = [];
    children: XmlNodeInterface[] = [];
    isSelfClosing = true;
    name: XmlNameInterface | undefined = undefined;

    buildElement(): XmlElement {
        return new XmlElement(
            this.name!,
            this.attributes,
            this.children,
            this.isSelfClosing,
        );
    }

    buildDocument(): XmlDocument {
        return new XmlDocument(this.children);
    }
}

export type BuilderFunction = () => void;
export type BuilderElement = BuilderFunction | XmlNodeInterface | string | number | boolean;

export class XmlBuilder {
    private readonly stack: NodeBuilder[] = [];

    constructor() {
        this.reset();
    }

    private reset(): void {
        this.stack.length = 0;

        const node = new NodeBuilder();
        this.stack.push(node);
    }

    private build<T extends XmlNodeInterface>(builder: (builder: NodeBuilder) => T): T {
        if (this.stack.length !== 1) {
            throw new Error('Unable to build an incomplete DOM element.');
        }

        try {
            return builder(this.stack[0]);
        } finally {
            this.reset();
        }
    }

    buildDocument(): XmlDocument {
        return this.build((builder) => builder.buildDocument());
    }

    element(
        name: string,
        options: {
            attributes?: Record<string, string>;
            isSelfClosing?: boolean;
            nest?: BuilderElement;
        } = {},
    ): void {
        const { attributes = {}, isSelfClosing = true, nest } = options;
        const element = new NodeBuilder();
        this.stack.push(element);

        try {
            for (const [key, value] of Object.entries(attributes)) {
                this.attribute(key, value);
            }

            if (nest) {
                this.insert(nest);
            }

            element.name = XmlName.fromString(name);
            element.isSelfClosing = isSelfClosing;
        } finally {
            this.stack.pop();
        }

        this.stack[this.stack.length - 1].children.push(element.buildElement());
    }

    attribute(
        name: string,
        value?: string | number | boolean,
        options: {
            attributeType?: XmlAttributeType;
        } = {},
    ): void {
        const { attributeType = XmlAttributeType.DOUBLE_QUOTE } = options;
        const attributes = this.stack[this.stack.length - 1].attributes;
        const attributeName = XmlName.fromString(name) as XmlNameInterface;
        const attributeIndex = attributes.findIndex(
            (attribute) => (attribute.name as XmlNameInterface).qualified === attributeName.qualified
        );

        if (attributeIndex < 0) {
            if (value !== undefined) {
                const attribute = new XmlAttribute(
                    attributeName,
                    value.toString(),
                    attributeType,
                );
                attributes.push(attribute);
            }
        } else {
            if (value !== undefined) {
                attributes[attributeIndex].value = value.toString();
            } else {
                attributes.splice(attributeIndex, 1);
            }
        }
    }

    processing(target: string, value: string): void {
        this.stack[this.stack.length - 1].children.push(
            new XmlProcessing(target, value),
        );
    }

    text(value: string): void {
        const children = this.stack[this.stack.length - 1].children;
        const lastChild = children[children.length - 1];

        if (lastChild instanceof XmlText) {
            lastChild.value += value;
            return;
        }

        children.push(new XmlText(value));
    }

    private insert(value: BuilderElement): void {
        if (typeof value === 'function') {
            value();
        } else if (typeof value === 'object' && 'nodeType' in value) {
            if (value instanceof XmlAttribute) {
                this.stack[this.stack.length - 1].attributes.push(value.copy() as XmlAttribute);
            } else {
                this.stack[this.stack.length - 1].children.push(value.copy());
            }
        } else {
            this.text(value.toString());
        }
    }
}