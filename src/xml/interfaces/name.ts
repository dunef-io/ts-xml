import { XmlVisitorInterface } from "./visitor.js";

/**
 * XML entity name.
 */
export interface XmlNameInterface {
    /**
     * Return the namespace prefix, or `undefined`.
     */
    readonly prefix: string | undefined;

    /**
     * Return the local name, excluding the namespace prefix.
     */
    readonly local: string;

    /**
     * Return the fully qualified name, including the namespace prefix.
     */
    readonly qualified: string;

    /**
     * Return the namespace URI, or `undefined`.
     */
    readonly namespaceUri: string | undefined;

    /**
     * Return a copy of this name.
     */
    copy(): XmlNameInterface;

    /**
     * Test if the qualified name is equal to `qualifiedName`.
     */
    is(qualifiedName: string): boolean;

    /**
     * Accept a visitor.
     */
    accept(visitor: XmlVisitorInterface): void;
}