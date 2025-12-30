import { Options as ParseOptions, Parser } from 'csv-parse/browser/esm';
import { RecordDelimiterId, ValueDelimiterId } from '@datapos/datapos-shared';
import { RetrieveRecordsOptions, RetrieveRecordsSummary } from '@datapos/datapos-shared/component/connector';
/**
 * Schema.
 */
interface SchemaConfig {
    recordDelimiter: RecordDelimiterId;
    valueDelimiter: ValueDelimiterId;
}
/** Tool. */
declare class Tool {
    /** Build parser. */
    buildParser(options: ParseOptions): Parser;
    /**
     * Determine schema configuration.
     */
    determineSchemaConfig(text: string, delimiters: string[]): Promise<SchemaConfig>;
    /**
     * Parse stream.
     */
    parseStream(retrieveRecordsOptions: RetrieveRecordsOptions, parseOptions: ParseOptions, url: string, abortController: AbortController, chunk: (records: (string[] | Record<string, unknown>)[]) => void): Promise<RetrieveRecordsSummary>;
}
export type { Options as ParseOptions, Parser } from 'csv-parse/browser/esm';
export { type SchemaConfig, Tool };
