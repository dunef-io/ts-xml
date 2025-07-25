import {
    XmlEvent,
    XmlStartElementEvent,
    XmlEndElementEvent,
    XmlTextEvent,
    XmlCommentEvent,
    XmlCDATAEvent,
    XmlProcessingEvent,
} from '../../events';
import { XmlDocument, XmlElement, XmlNode } from '../../..';
import { XmlDocumentImpl } from '../document';
import { XmlElementImpl } from '../element';
import { XmlTextImpl } from '../text';
import { XmlCommentImpl } from '../comment';
import { XmlCDATAImpl } from '../cdata';
import { XmlProcessingImpl } from '../processing';
import { XmlSimpleName } from '../name';
import { XmlNodeType } from '../../node_type';

export class XmlNodeDecoder {
    decode(events: XmlEvent[]): XmlDocument {
        const document = new XmlDocumentImpl();
        const parentStack: (XmlElement | XmlDocument)[] = [document];

        for (const event of events) {
            switch (event.nodeType) {
                case XmlNodeType.ELEMENT:
                    const startElementEvent = event as XmlStartElementEvent;
                    if (startElementEvent.isSelfClosing !== undefined) {
                        const element = new XmlElementImpl(
                            new XmlSimpleName(startElementEvent.name),
                        );
                        (parentStack[parentStack.length - 1].children as XmlNode[]).push(
                            element,
                        );
                        if (!startElementEvent.isSelfClosing) {
                            parentStack.push(element);
                        }
                    } else {
                        parentStack.pop();
                    }
                    break;
                case XmlNodeType.TEXT:
                    const textEvent = event as XmlTextEvent;
                    (parentStack[parentStack.length - 1].children as XmlNode[]).push(
                        new XmlTextImpl(textEvent.value),
                    );
                    break;
                case XmlNodeType.COMMENT:
                    const commentEvent = event as XmlCommentEvent;
                    (parentStack[parentStack.length - 1].children as XmlNode[]).push(
                        new XmlCommentImpl(commentEvent.value),
                    );
                    break;
                case XmlNodeType.CDATA:
                    const cdataEvent = event as XmlCDATAEvent;
                    (parentStack[parentStack.length - 1].children as XmlNode[]).push(
                        new XmlCDATAImpl(cdataEvent.value),
                    );
                    break;
                case XmlNodeType.PROCESSING:
                    const processingEvent = event as XmlProcessingEvent;
                    (parentStack[parentStack.length - 1].children as XmlNode[]).push(
                        new XmlProcessingImpl(
                            processingEvent.target,
                            processingEvent.value,
                        ),
                    );
                    break;
            }
        }
        return document;
    }
}