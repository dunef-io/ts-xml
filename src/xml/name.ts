import { XmlNameInterface, XmlHasVisitorInterface, XmlVisitorInterface } from './interfaces';

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

    is(qualifiedName: string): boolean {
        return this.qualified === qualifiedName;
    }

    copy(): XmlNameInterface {
        return new XmlSimpleName(this.local);
    }

    accept(visitor: XmlVisitorInterface): void {
        visitor.visitName(this);
    }
}

/**
 * A prefixed XML name.
 */
export class XmlPrefixName implements XmlNameInterface {
    constructor(readonly prefix: string, readonly local: string, readonly qualified: string) { }

    readonly namespaceUri: string | undefined = undefined;

    is(qualifiedName: string): boolean {
        return this.qualified === qualifiedName;
    }

    copy(): XmlNameInterface {
        return new XmlPrefixName(this.prefix, this.local, this.qualified);
    }

    accept(visitor: XmlVisitorInterface): void {
        visitor.visitName(this);
    }
}

export class XmlName {
    static fromString(qualified: string): XmlNameInterface {
        const index = qualified.indexOf(':');
        if (index > 0) {
            const prefix = qualified.substring(0, index);
            const local = qualified.substring(index + 1);
            return new XmlPrefixName(prefix, local, qualified);
        }

        return new XmlSimpleName(qualified);
    }
}