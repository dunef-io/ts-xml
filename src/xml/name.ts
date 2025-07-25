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
}

/**
 * A simple XML name without a prefix.
 */
export class XmlSimpleName implements XmlNameInterface {
    constructor(readonly local: string) { }

    readonly prefix: string | undefined = undefined;
    get qualified(): string {
        return this.local;
    }
    readonly namespaceUri: string | undefined = undefined;

    copy(): XmlNameInterface {
        return new XmlSimpleName(this.local);
    }
}

/**
 * A prefixed XML name.
 */
export class XmlPrefixName implements XmlNameInterface {
    constructor(readonly prefix: string, readonly local: string, readonly qualified: string) { }

    readonly namespaceUri: string | undefined = undefined;

    copy(): XmlNameInterface {
        return new XmlPrefixName(this.prefix, this.local, this.qualified);
    }
}