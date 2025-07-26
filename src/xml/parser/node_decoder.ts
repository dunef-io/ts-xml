import {
    XmlEvent,
    XmlStartElementEvent,
    XmlEndElementEvent,
    XmlTextEvent,
    XmlCommentEvent,
    XmlCDATAEvent,
    XmlProcessingEvent,
} from '../events';
import {
    XmlDocumentInterface, XmlElementInterface, XmlNodeInterface,
} from '@src/xml/interfaces';
import { XmlDocument } from '../document';
import { XmlElement } from '../element';
import { XmlText } from '../text';
import { XmlComment } from '../comment';
import { XmlCDATA } from '../cdata';
import { XmlProcessing } from '../processing';
import { XmlSimpleName } from '../name';
import { XmlNodeType } from '../node_type';

export class XmlNodeDecoder {
    decode(events: XmlEvent[]): XmlDocument {
        const document = new XmlDocument();
        const parentStack: (XmlElement | XmlDocument)[] = [document];

        for (const event of events) {
            switch (event.nodeType) {
                case XmlNodeType.ELEMENT:
                    const startElementEvent = event as XmlStartElementEvent;
                    if (startElementEvent.isSelfClosing !== undefined) {
                        const element = new XmlElement(
                            new XmlSimpleName(startElementEvent.name),
                        );
                        (parentStack[parentStack.length - 1].children as XmlNodeInterface[]).push(
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
                    (parentStack[parentStack.length - 1].children as XmlNodeInterface[]).push(
                        new XmlText(textEvent.value),
                    );
                    break;
                case XmlNodeType.COMMENT:
                    const commentEvent = event as XmlCommentEvent;
                    (parentStack[parentStack.length - 1].children as XmlNodeInterface[]).push(
                        new XmlComment(commentEvent.value),
                    );
                    break;
                case XmlNodeType.CDATA:
                    const cdataEvent = event as XmlCDATAEvent;
                    (parentStack[parentStack.length - 1].children as XmlNodeInterface[]).push(
                        new XmlCDATA(cdataEvent.value),
                    );
                    break;
                case XmlNodeType.PROCESSING:
                    const processingEvent = event as XmlProcessingEvent;
                    (parentStack[parentStack.length - 1].children as XmlNodeInterface[]).push(
                        new XmlProcessing(
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