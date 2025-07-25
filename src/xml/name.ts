/**
 * XML entity name.
 */
export interface XmlName {
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
    copy(): XmlName;
}