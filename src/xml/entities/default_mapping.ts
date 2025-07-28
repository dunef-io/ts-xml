import { XmlAttributeType } from '../attribute_type.js';
import { XmlEntityMapping } from './entity_mapping.js';
import { xmlEntities, htmlEntities, html5Entities } from './named_entities.js';

// highly discouraged characters from https://www.w3.org/TR/xml/#charsets
const HIGHLY_DISCOURAGED_CHAR_CLASS = /[\u0001-\u0008\u000b\u000c\u000e-\u001f\u007f-\u0084\u0086-\u009f]/g;
const TEXT_PATTERN = /[&<]|]]>/g;
const SINGLE_QUOTE_ATTRIBUTE_PATTERN = /['&<\n\r\t]/g;
const DOUBLE_QUOTE_ATTRIBUTE_PATTERN = /["&<\n\r\t]/g;

function asNumericCharacterReference(value: string): string {
    return `&#x${value.charCodeAt(0).toString(16).toUpperCase()};`;
}

function textReplace(match: string): string {
    switch (match) {
        case '<':
            return '<';
        case '&':
            return '&';
        case ']]>':
            return ']]>';
        default:
            return asNumericCharacterReference(match);
    }
}

function singleQuoteAttributeReplace(match: string): string {
    switch (match) {
        case "'":
            return "'";
        case '&':
            return '&';
        case '<':
            return '<';
        case '\n':
            return '&#xA;';
        case '\r':
            return '&#xD;';
        case '\t':
            return '&#x9;';
        default:
            return asNumericCharacterReference(match);
    }
}

function doubleQuoteAttributeReplace(match: string): string {
    switch (match) {
        case '"':
            return '"';
        case '&':
            return '&';
        case '<':
            return '<';
        case '\n':
            return '&#xA;';
        case '\r':
            return '&#xD;';
        case '\t':
            return '&#x9;';
        default:
            return asNumericCharacterReference(match);
    }
}

/**
 * Default entity mapping for XML, HTML, and HTML5 entities.
 */
export class XmlDefaultEntityMapping extends XmlEntityMapping {
    /**
     * Minimal entity mapping of XML character references.
     */
    static readonly XML = new XmlDefaultEntityMapping(xmlEntities);

    /**
     * Minimal entity mapping of HTML character references.
     */
    static readonly HTML = new XmlDefaultEntityMapping(htmlEntities);

    /**
     * Extensive entity mapping of HTML5 character references.
     */
    static readonly HTML5 = new XmlDefaultEntityMapping(html5Entities);

    /**
     * Named character references.
     */
    readonly entities: { [key: string]: string };

    /**
     * Custom entity mapping.
     */
    constructor(entities: { [key: string]: string }) {
        super();
        this.entities = entities;
    }

    override decodeEntity(input: string): string | undefined {
        if (input.length > 1 && input[0] === '#') {
            if (input.length > 2 && (input[1] === 'x' || input[1] === 'X')) {
                return this.decodeNumericEntity(input.substring(2), 16);
            } else {
                return this.decodeNumericEntity(input.substring(1), 10);
            }
        } else {
            return this.entities[input];
        }
    }

    private decodeNumericEntity(input: string, radix: number): string | undefined {
        const value = parseInt(input, radix);
        if (!isNaN(value) && value >= 0 && value <= 0x10FFFF) {
            return String.fromCodePoint(value);
        }
    }

    override encodeText(input: string): string {
        return input
            .replace(HIGHLY_DISCOURAGED_CHAR_CLASS, asNumericCharacterReference)
            .replace(TEXT_PATTERN, textReplace);
    }

    override encodeAttributeValue(input: string, type: XmlAttributeType): string {
        const pattern = type === XmlAttributeType.SINGLE_QUOTE ?
            SINGLE_QUOTE_ATTRIBUTE_PATTERN :
            DOUBLE_QUOTE_ATTRIBUTE_PATTERN;
        const replacer = type === XmlAttributeType.SINGLE_QUOTE ?
            singleQuoteAttributeReplace :
            doubleQuoteAttributeReplace;
        return input
            .replace(HIGHLY_DISCOURAGED_CHAR_CLASS, asNumericCharacterReference)
            .replace(pattern, replacer);
    }
}

/**
 * The entity mapping used when nothing else is specified.
 */
export const defaultEntityMapping = new XmlDefaultEntityMapping(xmlEntities);