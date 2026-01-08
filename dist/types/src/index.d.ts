import { Options } from 'csv-parse/browser/esm';
import { ParsingRecord, RecordDelimiterId, ValueDelimiterId } from '@datapos/datapos-shared/component/dataView';
import { RetrieveRecordsOptions, RetrieveRecordsSummary } from '@datapos/datapos-shared/component/connector';
/**
 * Parse text result.
 */
interface ParseTextResult {
    parsedRecords: ParsingRecord[];
    recordDelimiterId: RecordDelimiterId;
    valueDelimiterId: ValueDelimiterId;
}
/**
 * Tool.
 */
declare class Tool {
    /**
     * Parse stream.
     */
    parseStream(retrieveRecordsOptions: RetrieveRecordsOptions, parseOptions: Options, url: string, abortController: AbortController, chunk: (records: ParsingRecord[]) => void): Promise<RetrieveRecordsSummary>;
    /**
     * Parse text.
     */
    parseText(text: string, delimiters: ValueDelimiterId[]): Promise<ParseTextResult>;
}
export type { Options, Parser } from 'csv-parse/browser/esm';
export { type ParseTextResult, Tool };
