import { XmlBuilder } from '../src/xml/builder';

const builder = new XmlBuilder();

builder.element('books', {
    isSelfClosing: false,
    nest: () => {
        builder.element('book', {
            attributes: { 'id': '1' },
            isSelfClosing: false,
            nest: () => {
                builder.element('title', {
                    nest: 'The Hitchhiker\'s Guide to the Galaxy',
                    isSelfClosing: false
                });
                builder.element('author', {
                    nest: 'Douglas Adams',
                    isSelfClosing: false
                });
            }
        });
        builder.element('book', {
            attributes: { 'id': '2' },
            isSelfClosing: false,
            nest: () => {
                builder.element('title', {
                    nest: 'The Lord of the Rings',
                    isSelfClosing: false
                });
                builder.element('author', {
                    nest: 'J.R.R. Tolkien',
                    isSelfClosing: false
                });
            }
        });
    }
});

const doc = builder.buildDocument();

console.log(doc.toString());