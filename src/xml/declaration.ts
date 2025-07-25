import { XmlAttribute } from './attribute';
import { XmlHasAttributes } from './internal/mixins/has_attributes';
import { applyMixins } from './internal/utils/apply_mixins';
import { XmlHasAttributesInterface } from './mixins/has_attributes';
import { XmlNode, XmlNodeInterface } from './node';
import { XmlNodeType } from './node_type';
import { XmlVisitorInterface } from './visitor';

const versionAttribute = 'version';
const encodingAttribute = 'encoding';
const standaloneAttribute = 'standalone';

/**
 * XML document declaration.
 */
export interface XmlDeclarationInterface extends XmlNodeInterface, XmlHasAttributesInterface {
    readonly nodeType: XmlNodeType.DECLARATION;
    version: string | undefined;
    encoding: string | undefined;
    standalone: boolean | undefined;

    copy(): XmlDeclarationInterface;
}

class XmlDeclaration extends XmlNode {
    constructor(public attributes: XmlAttribute[] = []) {
        super();
    }

    readonly nodeType: XmlNodeType.DECLARATION = XmlNodeType.DECLARATION;

    get version(): string | undefined {
        return this.getAttribute(versionAttribute);
    }

    set version(value: string | undefined) {
        this.setAttribute(versionAttribute, value || '');
    }

    get encoding(): string | undefined {
        return this.getAttribute(encodingAttribute);
    }

    set encoding(value: string | undefined) {
        this.setAttribute(encodingAttribute, value || '');
    }

    get standalone(): boolean | undefined {
        const value = this.getAttribute(standaloneAttribute);
        return value ? value === 'yes' : undefined;
    }

    set standalone(value: boolean | undefined) {
        this.setAttribute(standaloneAttribute, value ? 'yes' : 'no');
    }

    copy(): XmlDeclaration {
        return new XmlDeclaration(
            this.attributes.map((attribute) => attribute.copy()),
        );
    }

    accept(visitor: XmlVisitorInterface): void {
        visitor.visitDeclaration(this);
    }
}

interface XmlDeclaration extends XmlHasAttributesInterface { }
applyMixins(XmlDeclaration, [XmlHasAttributes]);

export { XmlDeclaration };