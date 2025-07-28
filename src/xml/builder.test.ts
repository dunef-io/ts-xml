import { XmlBuilder } from './builder.js';
import { XmlDocument } from './document.js';
import { XmlElement } from './element.js';
import { XmlProcessing } from './processing.js';
import { XmlText } from './text.js';

describe('XmlBuilder', () => {
    it('should build a simple document', () => {
        const builder = new XmlBuilder();

        builder.processing('xml', 'version="1.0"');
        builder.element('bookshelf', {
            nest: () => {
                builder.element('book', {
                    nest: () => {
                        builder.element('title', {
                            nest: () => {
                                builder.attribute('lang', 'en');
                                builder.text('Growing a Language');
                            },
                        });
                        builder.element('price', {
                            nest: 29.99,
                        });
                    },
                });
                builder.element('book', {
                    nest: () => {
                        builder.element('title', {
                            nest: () => {
                                builder.attribute('lang', 'en');
                                builder.text('Learning XML');
                            },
                        });
                        builder.element('price', {
                            nest: 39.95,
                        });
                    },
                });
                builder.element('price', {
                    nest: '132.00',
                });
            },
        });

        const expected = [
            '<?xml version="1.0"?>',
            '<bookshelf>',
            '  <book>',
            '    <title lang="en">Growing a Language</title>',
            '    <price>29.99</price>',
            '  </book>',
            '  <book>',
            '    <title lang="en">Learning XML</title>',
            '    <price>39.95</price>',
            '  </book>',
            '  <price>132.00</price>',
            '</bookshelf>',
        ].join('\n');

        const document = builder.buildDocument();

        expect(document).toBeInstanceOf(XmlDocument);
        expect(document.children).toHaveLength(2);

        const processing = document.children[0] as XmlProcessing;
        expect(processing).toBeInstanceOf(XmlProcessing);
        expect(processing.target).toBe('xml');
        expect(processing.value).toBe('version="1.0"');

        const bookshelf = document.children[1] as XmlElement;
        expect(bookshelf).toBeInstanceOf(XmlElement);
        expect(bookshelf.name.qualified).toBe('bookshelf');
        expect(bookshelf.children).toHaveLength(3);

        const firstBook = bookshelf.children[0] as XmlElement;
        expect(firstBook).toBeInstanceOf(XmlElement);
        expect(firstBook.name.qualified).toBe('book');
        expect(firstBook.children).toHaveLength(2);

        const firstTitle = firstBook.children[0] as XmlElement;
        expect(firstTitle).toBeInstanceOf(XmlElement);
        expect(firstTitle.name.qualified).toBe('title');
        expect(firstTitle.attributes).toHaveLength(1);
        expect(firstTitle.attributes[0].name.qualified).toBe('lang');
        expect(firstTitle.attributes[0].value).toBe('en');
        expect(firstTitle.children).toHaveLength(1);
        expect((firstTitle.children[0] as XmlText).value).toBe('Growing a Language');

        const firstPrice = firstBook.children[1] as XmlElement;
        expect(firstPrice).toBeInstanceOf(XmlElement);
        expect(firstPrice.name.qualified).toBe('price');
        expect(firstPrice.children).toHaveLength(1);
        expect((firstPrice.children[0] as XmlText).value).toBe('29.99');

        const secondBook = bookshelf.children[1] as XmlElement;
        expect(secondBook).toBeInstanceOf(XmlElement);
        expect(secondBook.name.qualified).toBe('book');
        expect(secondBook.children).toHaveLength(2);

        const secondTitle = secondBook.children[0] as XmlElement;
        expect(secondTitle).toBeInstanceOf(XmlElement);
        expect(secondTitle.name.qualified).toBe('title');
        expect(secondTitle.attributes).toHaveLength(1);
        expect(secondTitle.attributes[0].name.qualified).toBe('lang');
        expect(secondTitle.attributes[0].value).toBe('en');
        expect(secondTitle.children).toHaveLength(1);
        expect((secondTitle.children[0] as XmlText).value).toBe('Learning XML');

        const secondPrice = secondBook.children[1] as XmlElement;
        expect(secondPrice).toBeInstanceOf(XmlElement);
        expect(secondPrice.name.qualified).toBe('price');
        expect(secondPrice.children).toHaveLength(1);
        expect((secondPrice.children[0] as XmlText).value).toBe('39.95');

        const lastPrice = bookshelf.children[2] as XmlElement;
        expect(lastPrice).toBeInstanceOf(XmlElement);
        expect(lastPrice.name.qualified).toBe('price');
        expect(lastPrice.children).toHaveLength(1);
        expect((lastPrice.children[0] as XmlText).value).toBe('132.00');

        expect(document.toXmlString({ pretty: true, indent: '  ' })).toBe(expected);
    });
});