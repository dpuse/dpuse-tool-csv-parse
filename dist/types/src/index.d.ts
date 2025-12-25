import { Options as ParseOptions, Parser } from 'csv-parse/browser/esm';
import { RetrieveRecordsSettings, RetrieveRecordsSummary } from '@datapos/datapos-shared';
/** Row. */
interface Row {
    row: string[];
}
/** Row buffer. */
interface RowBuffer {
    push: (row: Row) => void;
    flush: () => void;
}
/** Tool. */
declare class Tool {
    parser: Parser | undefined;
    rowBuffer: RowBuffer | undefined;
    /** Build parser. */
    buildParser(options: ParseOptions): Parser;
    /** Parse stream. */
    parseStream(parseOptions: ParseOptions, retrieveSettings: RetrieveRecordsSettings, url: string, signal: AbortSignal, reject: (error: unknown) => void, resolve: (summary: RetrieveRecordsSummary) => void): Promise<void>;
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
