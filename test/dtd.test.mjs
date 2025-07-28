import { strictEqual, deepStrictEqual } from 'assert';
import { XmlDocument } from '../src/index.js';

const xml = `
    <!DOCTYPE note [
        <!ELEMENT note (to,from,heading,body)>
        <!ELEMENT to (#PCDATA)>
        <!ELEMENT from (#PCDATA)>
        <!ELEMENT heading (#PCDATA)>
        <!ELEMENT body (#PCDATA)>
    ]>
    <note>
        <to>Tove</to>
        <from>Jani</from>
        <heading>Reminder</heading>
        <body>Don't forget me this weekend!</body>
    </note>
`;

const doc = XmlDocument.parse(xml);

strictEqual(doc.doctype?.name, 'note', 'The doctype name should be "note".');

console.log('DTD parsing test passed!');