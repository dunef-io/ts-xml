/**
 * Enum of the different XML node types.
 */
export enum XmlNodeType {
    /** An attribute like `id="123"`. */
    ATTRIBUTE,

    /** A CDATA section like `<!CDATA[[...]]>`. */
    CDATA,

    /** A comment like `<!-- comment -->`. */
    COMMENT,

    /** An XML declaration like `<?xml version='1.0'?>`. */
    DECLARATION,

    /** A document type declaration like `<!DOCTYPE html>`. */
    DOCUMENT_TYPE,

    /** A document object at the root of a document tree. */
    DOCUMENT,

    /** A document fragment. */
    DOCUMENT_FRAGMENT,

    /** An element node like `<item>`. */
    ELEMENT,

    /** The text contents of a node. */
    TEXT,

    /** A processing instruction like `<?pi test?>`. */
    PROCESSING,
}