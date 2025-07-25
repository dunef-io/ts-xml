import { XmlWriter } from './writer';
import { XmlDocument } from './document';
import { XmlElement } from './element';

export class PrettyXmlWriter extends XmlWriter {
    private readonly indent: string;
    private readonly newLine: string;
    private level = 0;

    constructor(
        options: {
            indent?: string;
            newLine?: string;
        } = {},
    ) {
        super();
        this.indent = options.indent || '  ';
        this.newLine = options.newLine || '\n';
    }

    visitDocument(node: XmlDocument): void {
        this.writeIterable(node.children);
    }

    visitElement(node: XmlElement): void {
        if (this.level > 0) {
            this.buffer.write(this.newLine);
        }
        this.buffer.write(this.indent.repeat(this.level));
        super.visitElement(node);
        if (!node.isSelfClosing) {
            this.level++;
            this.writeIterable(node.children);
            this.level--;
            if (this.level > 0) {
                this.buffer.write(this.newLine);
            }
            this.buffer.write(this.indent.repeat(this.level));
            this.buffer.write('</');
            this.visitName(node.name);
            this.buffer.write('>');
        }
    }
}