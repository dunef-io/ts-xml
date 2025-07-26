/**
 * Shared tokens for XML reading and writing.
 */
export class XmlToken {
    static readonly DOUBLE_QUOTE = '"';
    static readonly SINGLE_QUOTE = "'";
    static readonly EQUALS = '=';
    static readonly NAMESPACE = ':';
    static readonly WHITESPACE = ' ';
    static readonly OPEN_COMMENT = '<!--';
    static readonly CLOSE_COMMENT = '-->';
    static readonly OPEN_CDATA = '<![CDATA[';
    static readonly CLOSE_CDATA = ']]>';
    static readonly OPEN_ELEMENT = '<';
    static readonly CLOSE_ELEMENT = '>';
    static readonly OPEN_END_ELEMENT = '</';
    static readonly CLOSE_END_ELEMENT = '/>';
    static readonly OPEN_DECLARATION = '<?xml';
    static readonly CLOSE_DECLARATION = '?>';
    static readonly OPEN_DOCTYPE = '<!DOCTYPE';
    static readonly CLOSE_DOCTYPE = '>';
    static readonly OPEN_DOCTYPE_INT_SUBSET = '[';
    static readonly CLOSE_DOCTYPE_INT_SUBSET = ']';
    static readonly DOCTYPE_SYSTEM_ID = 'SYSTEM';
    static readonly DOCTYPE_PUBLIC_ID = 'PUBLIC';
    static readonly DOCTYPE_ELEMENT_DECL = '<!ELEMENT';
    static readonly DOCTYPE_ATTLIST_DECL = '<!ATTLIST';
    static readonly DOCTYPE_ENTITY_DECL = '<!ENTITY';
    static readonly DOCTYPE_NOTATION_DECL = '<!NOTATION';
    static readonly DOCTYPE_DECL_END = '>';
    static readonly DOCTYPE_REFERENCE_START = '%';
    static readonly DOCTYPE_REFERENCE_END = ';';
    static readonly OPEN_PROCESSING = '<?';
    static readonly CLOSE_PROCESSING = '?>';
    static readonly ENTITY_START = '&';
    static readonly ENTITY_END = ';';

    // https://en.wikipedia.org/wiki/QName
    static readonly NAME_START_CHARS =
        ':A-Z_a-z' +
        '\\u{c0}-\\u{d6}' +
        '\\u{d8}-\\u{f6}' +
        '\\u{f8}-\\u{2ff}' +
        '\\u{370}-\\u{37d}' +
        '\\u{37f}-\\u{1fff}' +
        '\\u{200c}-\\u{200d}' +
        '\\u{2070}-\\u{218f}' +
        '\\u{2c00}-\\u{2fef}' +
        '\\u{3001}-\\u{d7ff}' +
        '\\u{f900}-\\u{fdcf}' +
        '\\u{fdf0}-\\u{fffd}' +
        '\\u{10000}-\\u{effff}';
    static readonly NAME_CHARS =
        XmlToken.NAME_START_CHARS +
        '-.0-9' +
        '\\u{b7}' +
        '\\u{300}-\\u{36f}' +
        '\\u{203f}-\\u{2040}';
}