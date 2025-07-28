import { XmlAttributeType } from '../attribute_type.js';
import { XmlToken } from '../utils/token.js';

/**
 * Describes the decoding and encoding of character entities.
 */
export abstract class XmlEntityMapping {
    /**
     * Decodes a string, resolving all possible entities.
     */
    decode(input: string): string {
        let start = input.indexOf(XmlToken.ENTITY_START);
        if (start < 0) {
            return input;
        }

        const buffer: string[] = [input.substring(0, start)];
        while (true) {
            const index = input.indexOf(XmlToken.ENTITY_END, start + 1);
            if (start + 1 < index) {
                const entity = input.substring(start + 1, index);
                const value = this.decodeEntity(entity);
                if (value) {
                    buffer.push(value);
                    start = index + 1;
                } else {
                    buffer.push(XmlToken.ENTITY_START);
                    start++;
                }
            } else {
                buffer.push(XmlToken.ENTITY_START);
                start++;
            }

            const next = input.indexOf(XmlToken.ENTITY_START, start);
            if (next === -1) {
                buffer.push(input.substring(start));
                break;
            }
            buffer.push(input.substring(start, next));
            start = next;
        }
        return buffer.join('');
    }

    /**
     * Decodes a single character entity, returns the decoded entity or `undefined` if
     * the input is invalid.
     */
    abstract decodeEntity(input: string): string | undefined;

    /**
     * Encodes a string to be serialized as XML text.
     */
    abstract encodeText(input: string): string;

    /**
     * Encodes a string to be serialized as XML attribute value.
     */
    abstract encodeAttributeValue(input: string, type: XmlAttributeType): string;

    /**
     * Encodes a string to be serialized as XML attribute value together with
     * its corresponding quotes.
     */
    encodeAttributeValueWithQuotes(input: string, type: XmlAttributeType): string {
        const quote = type === XmlAttributeType.SINGLE_QUOTE ? XmlToken.SINGLE_QUOTE : XmlToken.DOUBLE_QUOTE;
        return `${quote}${this.encodeAttributeValue(input, type)}${quote}`;
    }
}