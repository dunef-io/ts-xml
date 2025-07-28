import { strictEqual } from 'assert';
import { XmlBuilder } from 'typescript-xml';

strictEqual(typeof XmlBuilder, 'function', 'The XmlBuilder export should be a function.');

console.log('Package-level test passed!');