export interface XmlHasWriter {
    toXmlString(options?: { pretty?: boolean }): string;
}