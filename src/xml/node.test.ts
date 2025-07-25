import { XmlElementImpl } from './internal/element';
import { XmlAttributeImpl } from './internal/attribute';
import { XmlTextImpl } from './internal/text';
import { XmlPrefixName, XmlSimpleName } from './internal/name';
import { XmlAttributeType } from './attribute_type';
import { XmlNodeType } from './node_type';

describe('XmlElement', () => {
    it('should create an element with a simple name', () => {
        const name = new XmlSimpleName('data');
        const element = new XmlElementImpl(name);
        expect(element.name).toBe(name);
        expect(element.attributes).toEqual([]);
        expect(element.children).toEqual([]);
        expect(element.isSelfClosing).toBe(true);
        expect(element.nodeType).toBe(XmlNodeType.ELEMENT);
    });

    it('should create an element with a prefixed name', () => {
        const name = new XmlPrefixName('ns', 'data', 'ns:data');
        const element = new XmlElementImpl(name);
        expect(element.name).toBe(name);
    });

    it('should create an element with attributes', () => {
        const name = new XmlSimpleName('data');
        const attributes = [
            new XmlAttributeImpl(new XmlSimpleName('key'), 'value', XmlAttributeType.DOUBLE_QUOTE),
        ];
        const element = new XmlElementImpl(name, attributes);
        expect(element.attributes).toBe(attributes);
    });

    it('should create an element with children', () => {
        const name = new XmlSimpleName('data');
        const children = [new XmlTextImpl('Am I or are the other crazy?')];
        const element = new XmlElementImpl(name, [], children);
        expect(element.children).toBe(children);
    });

    it('should get and set an attribute', () => {
        const name = new XmlSimpleName('data');
        const element = new XmlElementImpl(name);
        expect(element.getAttribute('key')).toBeUndefined();
        element.setAttribute('key', 'value');
        expect(element.getAttribute('key')).toBe('value');
    });

    it('should get an element', () => {
        const name = new XmlSimpleName('data');
        const childName = new XmlSimpleName('child');
        const child = new XmlElementImpl(childName);
        const element = new XmlElementImpl(name, [], [child]);
        expect(element.getElement('child')).toBe(child);
    });
});

describe('XmlAttribute', () => {
    it('should create an attribute', () => {
        const name = new XmlSimpleName('key');
        const attribute = new XmlAttributeImpl(name, 'value', XmlAttributeType.DOUBLE_QUOTE);
        expect(attribute.name).toBe(name);
        expect(attribute.value).toBe('value');
        expect(attribute.attributeType).toBe(XmlAttributeType.DOUBLE_QUOTE);
        expect(attribute.nodeType).toBe(XmlNodeType.ATTRIBUTE);
    });
});

describe('XmlText', () => {
    it('should create a text node', () => {
        const text = new XmlTextImpl('Am I or are the other crazy?');
        expect(text.value).toBe('Am I or are the other crazy?');
        expect(text.nodeType).toBe(XmlNodeType.TEXT);
    });
});