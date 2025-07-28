import { XmlDocument } from '../document.js';
import { XmlDoctype } from '../doctype.js';

export class DtdValidator {
    private readonly _doctype: XmlDoctype;

    constructor(doctype: XmlDoctype) {
        this._doctype = doctype;
    }

    validate(document: XmlDocument): void {
        // Placeholder for DTD validation logic.
        // This method will be implemented in a future step.
    }
}