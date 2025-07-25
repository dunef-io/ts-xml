import { XmlDeclaration } from '../declaration';
import { XmlNodeType } from '../node_type';
import { XmlNodeImpl } from './node';
import { XmlHasAttributesImpl } from './mixins/has_attributes';
import { applyMixins } from './utils/apply_mixins';
import { XmlAttribute } from '../attribute';

const versionAttribute = 'version';
const encodingAttribute = 'encoding';
const standaloneAttribute = 'standalone';

/**
 * XML document declaration.
 */
class XmlDeclarationImpl extends XmlNodeImpl {
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
        return new XmlDeclarationImpl(
            this.attributes.map((attribute) => attribute.copy()),
        );
    }

    accept(visitor: import('../visitor').XmlVisitor): void {
        visitor.visitDeclaration(this);
    }
}

interface XmlDeclarationImpl extends XmlHasAttributesImpl { }
applyMixins(XmlDeclarationImpl, [XmlHasAttributesImpl]);

export { XmlDeclarationImpl };