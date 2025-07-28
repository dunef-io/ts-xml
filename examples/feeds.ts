import { XmlBuilder } from '../src/xml/builder';

const builder = new XmlBuilder();

builder.element('rss', {
    attributes: {
        'version': '2.0',
        'xmlns:atom': 'http://www.w3.org/2005/Atom'
    },
    isSelfClosing: false,
    nest: () => {
        builder.element('channel', {
            isSelfClosing: false,
            nest: () => {
                builder.element('title', { isSelfClosing: false, nest: 'The Programming Times' });
                builder.element('link', { isSelfClosing: false, nest: 'http://www.programming-times.com/' });
                builder.element('description', { isSelfClosing: false, nest: 'Your daily dose of programming news.' });
                builder.element('atom:link', {
                    attributes: {
                        'href': 'http://www.programming-times.com/feed',
                        'rel': 'self',
                        'type': 'application/rss+xml'
                    },
                    isSelfClosing: true
                });
                builder.element('item', {
                    isSelfClosing: false,
                    nest: () => {
                        builder.element('title', { isSelfClosing: false, nest: 'New JIT Compiler Announced' });
                        builder.element('link', { isSelfClosing: false, nest: 'http://www.programming-times.com/jit-compiler' });
                        builder.element('description', { isSelfClosing: false, nest: 'A new just-in-time compiler has been announced...' });
                        builder.element('pubDate', { isSelfClosing: false, nest: 'Mon, 28 Jul 2025 12:00:00 GMT' });
                    }
                });
            }
        });
    }
});

const doc = builder.buildDocument();

console.log(doc.toString());