import {
    XmlEvent,
    XmlStartElementEvent,
    XmlEndElementEvent,
    XmlTextEvent,
    XmlCommentEvent,
    XmlCDATAEvent,
    XmlProcessingEvent,
    XmlDoctypeEvent,
} from '../events/index.js';
import { XmlNodeInterface, XmlAttributeInterface } from '../interfaces/index.js';
import { XmlDocument } from '../document.js';
import { XmlElement } from '../element.js';
import { XmlText } from '../text.js';
import { XmlComment } from '../comment.js';
import { XmlCDATA } from '../cdata.js';
import { XmlProcessing } from '../processing.js';
import { XmlName } from '../name.js';
import { XmlAttribute } from '../attribute.js';
import { XmlNodeType } from '../node_type.js';
import { XmlDoctype } from '../doctype.js';
import { DtdExternalId } from '../dtd/external_id.js';
import { XmlEventAttribute } from '../events/event_attribute.js';

export class XmlNodeDecoder {
    decode(events: XmlEvent[]): XmlDocument {
        const document = new XmlDocument();
        const parentStack: (XmlElement | XmlDocument)[] = [document];

        for (const event of events) {
            switch (event.nodeType) {
                case XmlNodeType.ELEMENT:
                    const startElementEvent = event as XmlStartElementEvent;
                    if (startElementEvent.isSelfClosing !== undefined) {
                        // Convert XmlEventAttribute[] to XmlAttributeInterface[]
                        const attributes: XmlAttributeInterface[] = startElementEvent.attributes.map(
                            (eventAttr: XmlEventAttribute) => new XmlAttribute(
                                XmlName.fromString(eventAttr.name),
                                eventAttr.value,
                                eventAttr.attributeType
                            )
                        );

                        const element = new XmlElement(
                            XmlName.fromString(startElementEvent.name),
                            attributes,
                            [], // children - will be populated later
                            startElementEvent.isSelfClosing
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
                case XmlNodeType.DOCUMENT_TYPE:
                    const doctypeEvent = event as XmlDoctypeEvent;
                    const externalId = doctypeEvent.externalId
                        ? new DtdExternalId(
                            doctypeEvent.externalId.systemId,
                            doctypeEvent.externalId.systemIdType,
                            doctypeEvent.externalId.publicId,
                            doctypeEvent.externalId.publicIdType,
                        )
                        : undefined;
                    (parentStack[parentStack.length - 1].children as XmlNodeInterface[]).push(
                        new XmlDoctype(
                            doctypeEvent.name,
                            externalId,
                            doctypeEvent.internalSubset,
                        ),
                    );
                    break;
            }
        }
        return document;
    }
}