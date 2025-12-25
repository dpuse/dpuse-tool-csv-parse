import { Options as ParseOptions, Parser } from 'csv-parse/browser/esm';
import { RetrieveRecordsSettings, RetrieveRecordsSummary } from '@datapos/datapos-shared';
/** Tool. */
declare class Tool {
    /** Build parser. */
    buildParser(options: ParseOptions): Parser;
    /** Parse stream. */
    parseStream(parseOptions: ParseOptions, retrieveSettings: RetrieveRecordsSettings, url: string, signal: AbortSignal, onError: (error: unknown) => void, onComplete: (summary: RetrieveRecordsSummary) => void): Promise<void>;
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
