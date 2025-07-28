import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { describe, it, expect } from '@jest/globals';
import { XmlDocument } from '../document.js';
import { XmlElement } from '../element.js';
import { XsdValidator } from './xsd_validator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('XSD Validator', () => {
    it('should validate a valid XML against an XSD', () => {
        const xsd = fs.readFileSync(path.join(__dirname, 'books.xsd'), 'utf-8');
        const xml = fs.readFileSync(path.join(__dirname, 'books.xml'), 'utf-8');
        const validator = new XsdValidator(xsd);
        const doc = XmlDocument.parse(xml);
        expect(() => validator.validate(doc.rootElement as XmlElement)).not.toThrow();
    });

    it('should throw an error for an invalid XML against an XSD', () => {
        const xsd = fs.readFileSync(path.join(__dirname, 'books.xsd'), 'utf-8');
        const xml = `
            <bookshelf>
                <book>
                    <title lang="en">Growing a Language</title>
                    <price>29.99</price>
                    <author>Guy Steele</author>
                </book>
            </bookshelf>
        `;
        const validator = new XsdValidator(xsd);
        const doc = XmlDocument.parse(xml);
        expect(() => validator.validate(doc.rootElement as XmlElement)).toThrow(
            'Unexpected element author in book'
        );
    });
});