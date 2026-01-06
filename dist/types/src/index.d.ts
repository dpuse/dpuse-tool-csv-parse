import { Options, Parser } from 'csv-parse/browser/esm';
import { EngineUtilities } from '@datapos/datapos-shared/engine';
import { ConnectionColumnConfig, RetrieveRecordsOptions, RetrieveRecordsSummary } from '@datapos/datapos-shared/component/connector';
import { InferenceRecord, ParsingRecord, RecordDelimiterId, ValueDelimiterId } from '@datapos/datapos-shared/component/dataView';
/**
 * Schema configuration.
 */
interface SchemaConfig {
    recordDelimiterId: RecordDelimiterId;
    valueDelimiterId: ValueDelimiterId;
    parsingRecords: ParsingRecord[];
    inferenceRecords: InferenceRecord[];
    columnConfigs: ConnectionColumnConfig[];
}
/** Tool. */
declare class Tool {
    /** Build parser. */
    buildParser(options: Options): Parser;
    /**
     * Infer schema.
     */
    inferSchema(engineUtilities: EngineUtilities, text: string, delimiters: ValueDelimiterId[]): Promise<SchemaConfig>;
    /**
     * Parse stream.
     */
    parseStream(retrieveRecordsOptions: RetrieveRecordsOptions, parseOptions: Options, url: string, abortController: AbortController, chunk: (records: ParsingRecord[]) => void): Promise<RetrieveRecordsSummary>;
}
export type { Options, Parser } from 'csv-parse/browser/esm';
export { Tool };
