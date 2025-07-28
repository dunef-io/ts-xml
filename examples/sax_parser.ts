import { XmlSaxParser } from '../src/index.js';

const xml = `
<root>
    <item>Hello</item>
    <item>World</item>
</root>
`;

const parser = new XmlSaxParser({
    onStartElement: (event) => {
        console.log(`Start Element: ${event.name}`);
    },
    onEndElement: (event) => {
        console.log(`End Element: ${event.name}`);
    },
    onText: (event) => {
        console.log(`Text: ${event.value}`);
    },
});

parser.parse(xml);