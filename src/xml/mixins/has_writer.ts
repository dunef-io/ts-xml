export interface XmlHasWriterInterface {
    toXmlString(options?: { pretty?: boolean }): string;
}