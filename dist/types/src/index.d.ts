import { Options, Parser } from 'csv-parse/browser/esm';
import { ParsingRecord, RecordDelimiterId, ValueDelimiterId } from '@datapos/datapos-shared/component/dataView';
import { RetrieveRecordsOptions, RetrieveRecordsSummary } from '@datapos/datapos-shared/component/connector';
/**
 * Parse preview configuration.
 */
interface ParsePreviewConfig {
    parsingRecords: ParsingRecord[];
    recordDelimiterId: RecordDelimiterId;
    valueDelimiterId: ValueDelimiterId;
}
/** Tool. */
declare class Tool {
    /** Build parser. */
    buildParser(options: Options): Parser;
    /**
     * Parse preview.
     */
    parsePreview(text: string, delimiters: ValueDelimiterId[]): Promise<ParsePreviewConfig>;
    /**
     * Parse stream.
     */
    parseStream(retrieveRecordsOptions: RetrieveRecordsOptions, parseOptions: Options, url: string, abortController: AbortController, chunk: (records: ParsingRecord[]) => void): Promise<RetrieveRecordsSummary>;
}
export type { Options, Parser } from 'csv-parse/browser/esm';
export { type ParsePreviewConfig, Tool };
