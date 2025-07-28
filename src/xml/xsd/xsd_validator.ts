import { XmlDocument } from '../document.js';
import { XmlElement } from '../element.js';
import { XmlElementInterface } from '../interfaces/index.js';

interface XsdAttribute {
    name: string;
    type: string;
    use: 'required' | 'optional';
    defaultValue?: string;
}

interface XsdElement {
    name: string;
    type?: string;
    minOccurs: number;
    maxOccurs: number | 'unbounded';
    complexType?: XsdComplexType;
    simpleType?: XsdSimpleType;
}

interface XsdSimpleType {
    base: string;
    restrictions?: any[];
}

interface XsdComplexType {
    sequence?: XsdElement[];
    choice?: XsdElement[];
    all?: XsdElement[];
    attributes?: XsdAttribute[];
    simpleContent?: {
        extension?: {
            base: string;
            attributes: XsdAttribute[];
        };
        restriction?: {
            base: string;
            attributes: XsdAttribute[];
        };
    };
}

interface XsdSchema {
    elements: Map<string, XsdElement>;
    types: Map<string, XsdComplexType | XsdSimpleType>;
    targetNamespace?: string;
}

export class XsdValidator {
    private readonly schema: XsdSchema;

    constructor(private readonly xsd: string) {
        this.schema = this.parseSchema();
    }

    private parseSchema(): XsdSchema {
        const doc = XmlDocument.parse(this.xsd);
        const schemaRoot = doc.rootElement;

        if (!this.isSchemaElement(schemaRoot)) {
            throw new Error('Invalid XSD schema: root element must be xs:schema');
        }

        const schema: XsdSchema = {
            elements: new Map(),
            types: new Map(),
            targetNamespace: schemaRoot.getAttribute('targetNamespace') || undefined,
        };

        // Parse top-level elements and types
        for (const child of schemaRoot.childElements) {
            if (this.isElementDefinition(child)) {
                const element = this.parseElementDefinition(child);
                if (element) {
                    schema.elements.set(element.name, element);
                }
            } else if (this.isComplexTypeDefinition(child)) {
                const typeName = child.getAttribute('name');
                if (typeName) {
                    const complexType = this.parseComplexType(child);
                    if (complexType) {
                        schema.types.set(typeName, complexType);
                    }
                }
            } else if (this.isSimpleTypeDefinition(child)) {
                const typeName = child.getAttribute('name');
                if (typeName) {
                    const simpleType = this.parseSimpleType(child);
                    if (simpleType) {
                        schema.types.set(typeName, simpleType);
                    }
                }
            }
        }

        return schema;
    }


    private isSchemaElement(element: XmlElementInterface): boolean {
        return element.name.local === 'schema' &&
            (element.name.namespaceUri === 'http://www.w3.org/2001/XMLSchema' ||
                element.name.prefix === 'xs');
    }

    private isElementDefinition(element: XmlElementInterface): boolean {
        return element.name.local === 'element' &&
            (element.name.namespaceUri === 'http://www.w3.org/2001/XMLSchema' ||
                element.name.prefix === 'xs');
    }

    private isComplexTypeDefinition(element: XmlElementInterface): boolean {
        return element.name.local === 'complexType' &&
            (element.name.namespaceUri === 'http://www.w3.org/2001/XMLSchema' ||
                element.name.prefix === 'xs');
    }

    private isSimpleTypeDefinition(element: XmlElementInterface): boolean {
        return element.name.local === 'simpleType' &&
            (element.name.namespaceUri === 'http://www.w3.org/2001/XMLSchema' ||
                element.name.prefix === 'xs');
    }

    private parseElementDefinition(element: XmlElementInterface): XsdElement | null {
        const name = element.getAttribute('name');
        if (!name) {
            return null;
        }

        const minOccurs = parseInt(element.getAttribute('minOccurs') || '1');
        const maxOccursAttr = element.getAttribute('maxOccurs') || '1';
        const maxOccurs = maxOccursAttr === 'unbounded' ? 'unbounded' : parseInt(maxOccursAttr);

        const xsdElement: XsdElement = {
            name,
            minOccurs,
            maxOccurs,
            type: element.getAttribute('type') || undefined,
        };

        // Check for inline complex type
        const complexTypeChild = element.childElements.find(child =>
            child.name.local === 'complexType' &&
            (child.name.namespaceUri === 'http://www.w3.org/2001/XMLSchema' || child.name.prefix === 'xs')
        );

        if (complexTypeChild) {
            const complexType = this.parseComplexType(complexTypeChild);
            if (complexType) {
                xsdElement.complexType = complexType;
            }
        }

        // Check for inline simple type
        const simpleTypeChild = element.childElements.find(child =>
            child.name.local === 'simpleType' &&
            (child.name.namespaceUri === 'http://www.w3.org/2001/XMLSchema' || child.name.prefix === 'xs')
        );

        if (simpleTypeChild) {
            const simpleType = this.parseSimpleType(simpleTypeChild);
            if (simpleType) {
                xsdElement.simpleType = simpleType;
            }
        }

        return xsdElement;
    }

    private parseComplexType(element: XmlElementInterface): XsdComplexType | null {
        const complexType: XsdComplexType = {};

        // Parse sequence
        const sequenceChild = element.childElements.find(child =>
            child.name.local === 'sequence' &&
            (child.name.namespaceUri === 'http://www.w3.org/2001/XMLSchema' || child.name.prefix === 'xs')
        );

        if (sequenceChild) {
            complexType.sequence = [];
            for (const child of sequenceChild.childElements) {
                if (this.isElementDefinition(child)) {
                    const childElement = this.parseElementDefinition(child);
                    if (childElement) {
                        complexType.sequence.push(childElement);
                    }
                }
            }
        }

        // Parse choice
        const choiceChild = element.childElements.find(child =>
            child.name.local === 'choice' &&
            (child.name.namespaceUri === 'http://www.w3.org/2001/XMLSchema' || child.name.prefix === 'xs')
        );

        if (choiceChild) {
            complexType.choice = [];
            for (const child of choiceChild.childElements) {
                if (this.isElementDefinition(child)) {
                    const childElement = this.parseElementDefinition(child);
                    if (childElement) {
                        complexType.choice.push(childElement);
                    }
                }
            }
        }

        // Parse all
        const allChild = element.childElements.find(child =>
            child.name.local === 'all' &&
            (child.name.namespaceUri === 'http://www.w3.org/2001/XMLSchema' || child.name.prefix === 'xs')
        );

        if (allChild) {
            complexType.all = [];
            for (const child of allChild.childElements) {
                if (this.isElementDefinition(child)) {
                    const childElement = this.parseElementDefinition(child);
                    if (childElement) {
                        complexType.all.push(childElement);
                    }
                }
            }
        }

        // Parse simpleContent
        const simpleContentChild = element.childElements.find(child =>
            child.name.local === 'simpleContent' &&
            (child.name.namespaceUri === 'http://www.w3.org/2001/XMLSchema' || child.name.prefix === 'xs')
        );

        if (simpleContentChild) {
            const extensionChild = simpleContentChild.childElements.find(child =>
                child.name.local === 'extension' &&
                (child.name.namespaceUri === 'http://www.w3.org/2001/XMLSchema' || child.name.prefix === 'xs')
            );

            if (extensionChild) {
                const base = extensionChild.getAttribute('base') || '';
                const attributes = this.parseAttributes(extensionChild);
                complexType.simpleContent = {
                    extension: { base, attributes }
                };
            }

            const restrictionChild = simpleContentChild.childElements.find(child =>
                child.name.local === 'restriction' &&
                (child.name.namespaceUri === 'http://www.w3.org/2001/XMLSchema' || child.name.prefix === 'xs')
            );

            if (restrictionChild) {
                const base = restrictionChild.getAttribute('base') || '';
                const attributes = this.parseAttributes(restrictionChild);
                complexType.simpleContent = {
                    restriction: { base, attributes }
                };
            }
        }

        // Parse direct attributes
        complexType.attributes = this.parseAttributes(element);

        return complexType;
    }

    private parseSimpleType(element: XmlElementInterface): XsdSimpleType | null {
        const restrictionChild = element.childElements.find(child =>
            child.name.local === 'restriction' &&
            (child.name.namespaceUri === 'http://www.w3.org/2001/XMLSchema' || child.name.prefix === 'xs')
        );

        if (restrictionChild) {
            const base = restrictionChild.getAttribute('base') || '';
            return { base, restrictions: [] };
        }

        return null;
    }

    private parseAttributes(element: XmlElementInterface): XsdAttribute[] {
        const attributes: XsdAttribute[] = [];

        for (const child of element.childElements) {
            if (child.name.local === 'attribute' &&
                (child.name.namespaceUri === 'http://www.w3.org/2001/XMLSchema' || child.name.prefix === 'xs')) {

                const name = child.getAttribute('name');
                if (name) {
                    const type = child.getAttribute('type') || 'xs:string';
                    const use = (child.getAttribute('use') || 'optional') as 'required' | 'optional';
                    const defaultValue = child.getAttribute('default') || undefined;

                    attributes.push({ name, type, use, defaultValue });
                }
            }
        }

        return attributes;
    }

    validate(xml: XmlElement): void {
        const rootElementSchema = this.schema.elements.get(xml.name.local);
        if (!rootElementSchema) {
            throw new Error(`Element ${xml.name.local} not found in schema`);
        }
        this.validateElement(xml, rootElementSchema);
    }

    private validateElement(element: XmlElementInterface, schema: XsdElement): void {
        // Validate attributes
        this.validateAttributes(element, schema);

        // Validate child elements based on complex type
        if (schema.complexType) {
            this.validateComplexType(element, schema.complexType);
        } else if (schema.type) {
            // Handle type references
            const typeDefinition = this.schema.types.get(schema.type);
            if (typeDefinition && typeof typeDefinition === 'object' && 'sequence' in typeDefinition) {
                this.validateComplexType(element, typeDefinition as XsdComplexType);
            }
        }
    }

    private validateAttributes(element: XmlElementInterface, schema: XsdElement): void {
        let requiredAttributes: XsdAttribute[] = [];

        // Get attributes from complex type
        if (schema.complexType) {
            if (schema.complexType.attributes) {
                requiredAttributes = requiredAttributes.concat(schema.complexType.attributes);
            }
            if (schema.complexType.simpleContent?.extension?.attributes) {
                requiredAttributes = requiredAttributes.concat(schema.complexType.simpleContent.extension.attributes);
            }
            if (schema.complexType.simpleContent?.restriction?.attributes) {
                requiredAttributes = requiredAttributes.concat(schema.complexType.simpleContent.restriction.attributes);
            }
        }

        // Check required attributes
        for (const attr of requiredAttributes) {
            if (attr.use === 'required') {
                const value = element.getAttribute(attr.name);
                if (value === null) {
                    throw new Error(`Missing required attribute ${attr.name} in ${element.name.local}`);
                }
            }
        }

        // Check for unexpected attributes (simplified - in real XSD, this would be more complex)
        const allowedAttributeNames = new Set(requiredAttributes.map(attr => attr.name));
        for (const attr of element.attributes) {
            // Skip XML namespace declarations and XML Schema Instance attributes
            const isNamespaceDeclaration = attr.name.prefix === 'xmlns' || attr.name.local === 'xmlns';
            const isXmlSchemaInstance = attr.name.prefix === 'xs' || attr.name.prefix === 'xsi';
            const isXmlAttribute = attr.name.prefix === 'xml'; // xml:lang, xml:space, etc.

            if (!allowedAttributeNames.has(attr.name.local) &&
                !isNamespaceDeclaration &&
                !isXmlSchemaInstance &&
                !isXmlAttribute) {
                throw new Error(`Unexpected attribute ${attr.name.local} in ${element.name.local}`);
            }
        }
    }

    private validateComplexType(element: XmlElementInterface, complexType: XsdComplexType): void {
        if (complexType.sequence) {
            this.validateSequence(element, complexType.sequence);
        } else if (complexType.choice) {
            this.validateChoice(element, complexType.choice);
        } else if (complexType.all) {
            this.validateAll(element, complexType.all);
        }
    }

    private validateSequence(element: XmlElementInterface, sequence: XsdElement[]): void {
        const childElements = element.childElements;
        let childIndex = 0;

        for (const schemaElement of sequence) {
            let matchCount = 0;
            const maxOccurs = schemaElement.maxOccurs === 'unbounded' ? Infinity : schemaElement.maxOccurs;

            // Count matching elements
            while (childIndex < childElements.length && matchCount < maxOccurs) {
                const childElement = childElements[childIndex];
                if (childElement.name.local === schemaElement.name) {
                    // Validate the child element recursively
                    this.validateElement(childElement, schemaElement);
                    matchCount++;
                    childIndex++;
                } else {
                    break;
                }
            }

            // Check occurrence constraints
            if (matchCount < schemaElement.minOccurs) {
                throw new Error(`Missing element ${schemaElement.name} in ${element.name.local} (found ${matchCount}, required at least ${schemaElement.minOccurs})`);
            }
        }

        // Check for unexpected elements
        if (childIndex < childElements.length) {
            const unexpectedElement = childElements[childIndex];
            throw new Error(`Unexpected element ${unexpectedElement.name.local} in ${element.name.local}`);
        }
    }

    private validateChoice(element: XmlElementInterface, choice: XsdElement[]): void {
        const childElements = element.childElements;

        if (childElements.length === 0) {
            throw new Error(`Element ${element.name.local} must contain one of: ${choice.map(e => e.name).join(', ')}`);
        }

        // For simplicity, validate that at least one choice matches
        let hasMatch = false;
        for (const childElement of childElements) {
            for (const choiceElement of choice) {
                if (childElement.name.local === choiceElement.name) {
                    this.validateElement(childElement, choiceElement);
                    hasMatch = true;
                    break;
                }
            }
        }

        if (!hasMatch) {
            throw new Error(`Element ${element.name.local} must contain one of: ${choice.map(e => e.name).join(', ')}`);
        }
    }

    private validateAll(element: XmlElementInterface, all: XsdElement[]): void {
        const childElements = element.childElements;
        const requiredElements = new Set(all.filter(e => e.minOccurs > 0).map(e => e.name));
        const foundElements = new Set<string>();

        for (const childElement of childElements) {
            const schemaElement = all.find(e => e.name === childElement.name.local);
            if (!schemaElement) {
                throw new Error(`Unexpected element ${childElement.name.local} in ${element.name.local}`);
            }

            if (foundElements.has(childElement.name.local)) {
                throw new Error(`Duplicate element ${childElement.name.local} in ${element.name.local}`);
            }

            foundElements.add(childElement.name.local);
            this.validateElement(childElement, schemaElement);
        }

        // Check for missing required elements
        for (const requiredElement of requiredElements) {
            if (!foundElements.has(requiredElement)) {
                throw new Error(`Missing required element ${requiredElement} in ${element.name.local}`);
            }
        }
    }
}