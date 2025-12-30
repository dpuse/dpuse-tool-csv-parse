import { Options as ParseOptions, Parser } from 'csv-parse/browser/esm';
import { RecordDelimiterId, ValueDelimiterId } from '@datapos/datapos-shared';
import { RetrieveRecordsOptions, RetrieveRecordsSummary } from '@datapos/datapos-shared/component/connector';
/**
 * Parse record and parsed record buffer.
 */
type ParsedRecord = string[];
/**
 * Schema configuration.
 */
interface SchemaConfig {
    recordDelimiterId: RecordDelimiterId;
    records: ParsedRecord[];
    valueDelimiterId: ValueDelimiterId;
}
/** Tool. */
declare class Tool {
    /** Build parser. */
    buildParser(options: ParseOptions): Parser;
    /**
     * Determine schema configuration.
     */
    determineSchemaConfig(text: string, delimiters: ValueDelimiterId[]): Promise<SchemaConfig>;
    /**
     * Parse stream.
     */
    parseStream(retrieveRecordsOptions: RetrieveRecordsOptions, parseOptions: ParseOptions, url: string, abortController: AbortController, chunk: (records: (string[] | Record<string, unknown>)[]) => void): Promise<RetrieveRecordsSummary>;
}
export type { Options as ParseOptions, Parser } from 'csv-parse/browser/esm';
export { type ParsedRecord, type SchemaConfig, Tool };
