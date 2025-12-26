import { Options as ParseOptions, Parser } from 'csv-parse/browser/esm';
import { RetrieveRecordsOptions, RetrieveRecordsSummary } from '@datapos/datapos-shared/component/connector';
/** Tool. */
declare class Tool {
    /** Build parser. */
    buildParser(options: ParseOptions): Parser;
    /** Parse stream. */
    parseStream(parseOptions: ParseOptions, retrieveRecordsOptions: RetrieveRecordsOptions, url: string, signal: AbortSignal): Promise<RetrieveRecordsSummary>;
    /** Parse string. */
    parseString(): void;
    /** Construct row buffer. */
    private constructRowBuffer;
    /** Construct summary. */
    private constructSummary;
    /** Write to parser. */
    private writeToParser;
}
/** Exports */
export type { Options as ParseOptions, Parser } from 'csv-parse/browser/esm';
export { Tool };
