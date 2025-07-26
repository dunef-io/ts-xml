import { XmlElement } from './element';
import { XmlAttribute } from './attribute';
import { XmlText } from './text';
import { XmlPrefixName, XmlSimpleName } from './name';
import { XmlAttributeType } from './attribute_type';
import { XmlNodeType } from './node_type';

describe('XmlElement', () => {
    describe('constructor', () => {
        it('should create an element with a simple name', () => {
            const name = new XmlSimpleName('data');
            const element = new XmlElement(name);
            expect(element.name).toBe(name);
            expect(element.attributes).toEqual([]);
            expect(element.children).toEqual([]);
            expect(element.isSelfClosing).toBe(true);
            expect(element.nodeType).toBe(XmlNodeType.ELEMENT);
        });

        it('should create an element with a prefixed name', () => {
            const name = new XmlPrefixName('ns', 'data', 'ns:data');
            const element = new XmlElement(name);
            expect(element.name).toBe(name);
        });

        it('should create an element with attributes', () => {
            const name = new XmlSimpleName('data');
            const attributes = [
                new XmlAttribute(new XmlSimpleName('key'), 'value', XmlAttributeType.DOUBLE_QUOTE),
            ];
            const element = new XmlElement(name, attributes);
            expect(element.attributes).toBe(attributes);
        });

        it('should create an element with children', () => {
            const name = new XmlSimpleName('data');
            const children = [new XmlText('Am I or are the other crazy?')];
            const element = new XmlElement(name, [], children);
            expect(element.children).toBe(children);
        });
    });

    describe('getAttribute', () => {
        it('should get and set an attribute', () => {
            const name = new XmlSimpleName('data');
            const element = new XmlElement(name);
            expect(element.getAttribute('key')).toBeNull();
            element.setAttribute('key', 'value');
            expect(element.getAttribute('key')).toBe('value');
        });
    });

    describe('getElement', () => {
        it('should get an element', () => {
            const name = new XmlSimpleName('data');
            const childName = new XmlSimpleName('child');
            const child = new XmlElement(childName);
            const element = new XmlElement(name, [], [child]);
            expect(element.getElement('child')).toBe(child);
        });
    });

    describe('findElement', () => {
        it('should find a direct child element', () => {
            const name = new XmlSimpleName('data');
            const childName = new XmlSimpleName('child');
            const child = new XmlElement(childName);
            const element = new XmlElement(name, [], [child]);
            expect(element.findElement('child')).toBe(child);
        });

        it('should find a nested child element', () => {
            const name = new XmlSimpleName('data');
            const childName = new XmlSimpleName('child');
            const grandChildName = new XmlSimpleName('grandchild');
            const grandChild = new XmlElement(grandChildName);
            const child = new XmlElement(childName, [], [grandChild]);
            const element = new XmlElement(name, [], [child]);
            expect(element.findElement('grandchild')).toBe(grandChild);
        });
    });

    describe('findElements', () => {
        it('should find elements', () => {
            const name = new XmlSimpleName('data');
            const childName = new XmlSimpleName('child');
            const child1 = new XmlElement(childName);
            const child2 = new XmlElement(childName);
            const element = new XmlElement(name, [], [child1, child2]);
            expect(element.findElements('child')).toEqual([child1, child2]);
        });
    });

    describe('innerText', () => {
        it('should get inner text', () => {
            const name = new XmlSimpleName('data');
            const childName = new XmlSimpleName('child');
            const child = new XmlElement(childName, [], [new XmlText('Hello')]);
            const element = new XmlElement(name, [], [child, new XmlText('World')]);
            expect(element.innerText).toBe('HelloWorld');
        });

        it('should get inner text with nested elements', () => {
            const name = new XmlSimpleName('data');
            const childName = new XmlSimpleName('child');
            const grandChildName = new XmlSimpleName('grandchild');
            const grandChild = new XmlElement(grandChildName, [], [new XmlText('World')]);
            const child = new XmlElement(childName, [], [new XmlText('Hello'), grandChild]);
            const element = new XmlElement(name, [], [child]);
            expect(element.innerText).toBe('HelloWorld');
        });
    });
});