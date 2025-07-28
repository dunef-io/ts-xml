# typescript-xml

[![NPM Version](https://img.shields.io/npm/v/typescript-xml.svg)](https://www.npmjs.com/package/typescript-xml)
[![License](https://img.shields.io/npm/l/typescript-xml.svg)](./LICENSE)

`typescript-xml` is a lightweight and intuitive TypeScript library for parsing, traversing, querying, and building XML documents. It provides a simple DOM-like API that makes working with XML feel natural in modern TypeScript projects.

## Features

- **Parse Well-Formed XML:** Reliably parse any standard-compliant XML string into a navigable tree structure.
- **Traverse the Tree:** Easily navigate the XML hierarchy with powerful properties like `parentElement`, `children`, and `attributes`.
- **Query Elements:** Quickly find elements using simple methods like `getElement(name)`, `findElements(name)`, and `findAllElements(name)`.
- **Manipulate the DOM:** Full support for adding, removing, and replacing nodes to dynamically modify the XML structure.
- **Serialize to String:** Convert your XML document back to a string, with options for pretty-printing.
- **Build Documents Programmatically:** Use a fluent builder API to construct complex XML structures from scratch.
- **Full Type Support:** Includes strong TypeScript definitions for all major XML node types, including `Element`, `Text`, `Comment`, `CDATA`, `ProcessingInstruction`, and `Doctype`.
- **Event-Based (SAX-style) Parsing:** Efficiently parse very large XML files by processing events as they occur, without loading the entire document into memory.

## Installation

Install the package using your favorite package manager:

```bash
# With npm
npm install typescript-xml

# With pnpm
pnpm add typescript-xml
```

### Parsing a Document

To get started, use the static `XmlDocument.parse()` method to convert an XML string into a document object.

```typescript
const xmlString = `
  <rss version="2.0">
    <channel>
      <title>My Feed</title>
      <item>
        <title>Item 1</title>
      </item>
    </channel>
  </rss>
`;

const document = XmlDocument.parse(xmlString);
```

If the input string is not well-formed, the parser will throw an `Error`.

### Traversing the Tree

Once parsed, you can easily navigate the document tree.

#### Accessing Nodes

Start from the `rootElement` to begin traversal. From any element, you can access its `children`, `attributes`, and `parentElement`.

```typescript
// Get the root element: <rss>
const rssElement = document.rootElement;

// Get the <channel> element
const channelElement = rssElement.getElement('channel');

if (channelElement) {
  // Get all <item> elements within <channel>
  const items = channelElement.findElements('item');
  console.log(`Found ${items.length} item(s).`);

  // Access the text content of the <title> inside the first item
  const firstItemTitle = items[0]?.getElement('title')?.innerText;
  console.log('First item title:', firstItemTitle); // 'Item 1'
}
```

#### Finding Elements

The library provides three methods to locate elements:
- `getElement(name)`: Returns the *first direct child* element with the given name, or `undefined` if not found.
- `findElements(name)`: Finds direct children of the current node with the provided tag name.
- `findAllElements(name)`: Finds direct and indirect children of the current node with the provided tag name, searching recursively.

### Serializing to a String

To convert your `XmlDocument` (or any `XmlNode`) back into a string, use the `toXmlString()` method. This is useful for saving changes or for sending XML data.

```typescript
// Get the XML as a compact string
const compactXml = document.toXmlString();

// Or get it nicely formatted
const prettyXml = document.toXmlString({ pretty: true });
console.log(prettyXml);
```

### Event-Based (SAX-Style) Parsing
|
For very large XML files, loading the entire document into memory can be inefficient. `typescript-xml` provides an event-based (SAX-style) parser that emits events as it reads the XML stream. This approach is memory-efficient and ideal for processing large datasets.
|
Use the `XmlSaxParser` and provide callbacks for the events you want to handle:
|
|```typescript
|const saxParser = new XmlSaxParser({
 onStartElement: (event) => {
   console.log(`Start Element: ${event.name}`);
   if (event.attributes.length > 0) {
     const attrs = event.attributes
       .map((attr) => `${attr.name}="${attr.value}"`)
       .join(', ');
     console.log(`  Attributes: ${attrs}`);
   }
 },
 onEndElement: (event) => {
   console.log(`End Element: ${event.name}`);
 },
 onText: (event) => {
   const trimmedText = event.value.trim();
   if (trimmedText) {
     console.log(`Text: "${trimmedText}"`);
   }
 },
|});
|
|const xmlStream = `
 <library>
   <book id="bk101">
     <author>Gambardella, Matthew</author>
     <title>XML Developer's Guide</title>
     <genre>Computer</genre>
   </book>
 </library>
|`;
|
|saxParser.parse(xmlStream);
|```
|
### Complex Example: Processing a Bookshelf

Here is a more advanced example that showcases combining methods to process a collection of data.

```typescript
const bookshelfXml = `
  <bookshelf>
    <book>
      <title lang="en">The Hitchhiker's Guide to the Galaxy</title>
      <price>12.50</price>
    </book>
    <book>
      <title lang="en">The Lord of the Rings</title>
      <price>22.99</price>
    </book>
    <book>
      <title lang="de">Die Verwandlung</title>
      <price>9.95</price>
    </book>
  </bookshelf>
`;

const bookshelfDoc = XmlDocument.parse(bookshelfXml);
const bookshelfRoot = bookshelfDoc.rootElement;

// 1. Find all books and calculate the total price
const allBooks = bookshelfRoot.findAllElements('book');

const totalCost = allBooks
  .map(book => {
    const priceElement = book.getElement('price');
    return priceElement ? parseFloat(priceElement.innerText) : 0;
  })
  .reduce((sum, price) => sum + price, 0);

console.log(`Total cost: $${totalCost.toFixed(2)}`); // Total cost: $45.44

// 2. Find all English books and log their titles
const englishBooks = bookshelfRoot.findAllElements('book')
  .filter(book => {
    const title = book.getElement('title');
    return title?.getAttribute('lang') === 'en';
  });

console.log('English titles:');
englishBooks.forEach(book => {
  console.log(`- ${book.getElement('title')?.innerText}`);
});

// 3. Add a new book to the bookshelf
const newBook = new XmlElement('book');
const newTitle = new XmlElement('title');
newTitle.setAttribute('lang', 'en');
newTitle.children.push(new XmlText('Dune'));
const newPrice = new XmlElement('price');
newPrice.children.push(new XmlText('15.00'));

newBook.children.push(newTitle, newPrice);
bookshelfRoot.children.push(newBook);

console.log('\n--- Updated Bookshelf ---');
console.log(bookshelfDoc.toXmlString({ pretty: true }));
```

### Building XML

For more complex XML creation, `XmlBuilder` offers a declarative and fluent API to construct documents programmatically. This is especially useful when building documents from data or when the structure is dynamic.

```typescript
const builder = new XmlBuilder();

builder.element('items', {
  nest: () => {
    for (let i = 1; i <= 3; i++) {
      builder.element('item', {
        nest: () => {
          builder.attribute('id', `item-${i}`);
          builder.element('name', { nest: `Item #${i}` });
          builder.element('price', { nest: (i * 1.5).toFixed(2) });
        },
      });
    }
  },
});

const doc = builder.buildDocument();

console.log(doc.toXmlString({ pretty: true, indent: '  ' }));
```

This will produce the following output:

```xml
<items>
  <item id="item-1">
    <name>Item #1</name>
    <price>1.50</price>
  </item>
  <item id="item-2">
    <name>Item #2</name>
    <price>3.00</price>
  </item>
  <item id="item-3">
    <name>Item #3</name>
    <price>4.50</price>
  </item>
</items>
```

## Limitations

`typescript-xml` is designed for simplicity and ease of use. To maintain its lightweight footprint, it does not currently support:
-   🚫 DTD or XML Schema validation.
-   🚫 XPath or XSLT transformations.

## Credits

This library is a faithful port of the [dart-xml](https://github.com/renggli/dart-xml) package, created by Lukas Renggli. A huge thank you to him for the original design and implementation.

## License

This project is licensed under the **ISC License**. See the [LICENSE](./LICENSE) file for details.