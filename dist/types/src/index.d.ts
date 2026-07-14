import { Options } from 'csv-parse/browser/esm';
import { ParsingRecord, RecordDelimiterId, ValueDelimiterId } from '@dpuse/dpuse-shared/component/dataView';
import { RecordRetrievalTypeId, RetrieveRecordsOptions, RetrieveRecordsSummary } from '@dpuse/dpuse-shared/component/module/connector';
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
    parseStream(retrieveRecordsOptions: RetrieveRecordsOptions, parseOptions: Options, url: string, abortController: AbortController, chunk: (typeId: RecordRetrievalTypeId, records: ParsingRecord[]) => void): Promise<RetrieveRecordsSummary>;
    /**
     * Parse text.
     */
    parseText(text: string, delimiters: ValueDelimiterId[]): Promise<ParseTextResult>;
}
export type { Options, Parser } from 'csv-parse/browser/esm';
export { type ParseTextResult, Tool };
