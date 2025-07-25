import { XmlName } from '../name';

/**
 * A simple XML name without a prefix.
 */
export class XmlSimpleName implements XmlName {
    constructor(readonly local: string) { }

    readonly prefix: string | undefined = undefined;
    get qualified(): string {
        return this.local;
    }
    readonly namespaceUri: string | undefined = undefined;

    copy(): XmlName {
        return new XmlSimpleName(this.local);
    }
}

/**
 * A prefixed XML name.
 */
export class XmlPrefixName implements XmlName {
    constructor(readonly prefix: string, readonly local: string, readonly qualified: string) { }

    readonly namespaceUri: string | undefined = undefined;

    copy(): XmlName {
        return new XmlPrefixName(this.prefix, this.local, this.qualified);
    }
}