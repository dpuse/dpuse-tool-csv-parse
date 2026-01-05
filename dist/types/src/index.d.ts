import { Options as ParseOptions, Parser } from 'csv-parse/browser/esm';
import { EngineUtilities } from '@datapos/datapos-shared/engine';
import { ConnectionColumnConfig, RetrieveRecordsOptions, RetrieveRecordsSummary } from '@datapos/datapos-shared/component/connector';
import { ParseRecord, RecordDelimiterId, ValueDelimiterId } from '@datapos/datapos-shared/component/dataView';
/**
 * Schema configuration.
 */
interface SchemaConfig {
    columnConfigs: ConnectionColumnConfig[];
    recordDelimiterId: RecordDelimiterId;
    records: ParseRecord[][];
    valueDelimiterId: ValueDelimiterId;
}
/** Tool. */
declare class Tool {
    /** Build parser. */
    buildParser(options: ParseOptions): Parser;
    /**
     * Determine schema configuration.
     */
    determineSchemaConfig(engineUtilities: EngineUtilities, text: string, delimiters: ValueDelimiterId[]): Promise<SchemaConfig>;
    /**
     * Parse stream.
     */
    parseStream(retrieveRecordsOptions: RetrieveRecordsOptions, parseOptions: ParseOptions, url: string, abortController: AbortController, chunk: (records: ParseRecord[]) => void): Promise<RetrieveRecordsSummary>;
}
export type { Options as ParseOptions, Parser } from 'csv-parse/browser/esm';
export { type SchemaConfig, Tool };
