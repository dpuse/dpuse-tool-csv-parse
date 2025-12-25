/**
 * CSV Parse tool.
 */

/** Vendor dependencies. */
import { parse, type Options as ParseOptions, type Parser } from 'csv-parse/browser/esm';

/** Framework dependencies. */
import { buildFetchError, type RetrieveRecordsSettings, type RetrieveRecordsSummary } from '@datapos/datapos-shared';

/** Row. */
interface Row {
    row: string[];
}

/** Row buffer. */
interface RowBuffer {
    push: (row: Row) => void;
    flush: () => void;
}

/** Constants. */
const DEFAULT_RETRIEVE_CHUNK_SIZE = 4096;

/** Tool. */
class Tool {
    parser: Parser | undefined = undefined;
    rowBuffer: RowBuffer | undefined = undefined;

    /** Build parser. */
    buildParser(options: ParseOptions): Parser {
        return parse(options);
    }

    /** Parse stream. */
    async parseStream(
        parseOptions: ParseOptions,
        retrieveSettings: RetrieveRecordsSettings,
        url: string,
        signal: AbortSignal,
        reject: (error: unknown) => void,
        resolve: (summary: RetrieveRecordsSummary) => void
    ): Promise<void> {
        this.parser = parse(parseOptions);
        this.rowBuffer = this.constructRowBuffer({ chunk: () => void 0, chunkSize: retrieveSettings.chunkSize ?? DEFAULT_RETRIEVE_CHUNK_SIZE });
        this.parser.on('readable', () => {
            try {
                let row: Row | null;
                while ((row = this.parser?.read() as Row | null) != null) {
                    signal.throwIfAborted();
                    this.rowBuffer?.push(row);
                }
            } catch (error) {
                reject(error);
            }
        });
        this.parser.on('error', (error) => reject(error));
        this.parser.on('end', () => resolve(this.constructSummary()));

        const response = await fetch(encodeURI(url), { signal });
        if (!response.ok || response.body == null) {
            throw await buildFetchError(response, `Failed to fetch '${url}' file.`, 'datapos-connector-file-store-emulator|Connector|retrieve');
        }

        const reader = response.body.pipeThrough(new TextDecoderStream(retrieveSettings.encodingId)).getReader();
        let result = await reader.read();
        while (!result.done) {
            signal.throwIfAborted();
            await this.writeToParser(result.value);
            result = await reader.read();
        }

        this.parser.end();
    }

    /** Parse string. */
    parseString(): void {
        return void 0;
    }

    /** Construct row buffer. */
    private constructRowBuffer(bufferOptions: { chunk: (rows: Row[]) => void; chunkSize: number }): RowBuffer {
        let rows: Row[] = [];

        const flush = (): void => {
            if (rows.length === 0) return;
            bufferOptions.chunk(rows);
            rows = [];
        };

        const push = (row: Row): void => {
            rows.push(row);
            if (rows.length >= bufferOptions.chunkSize) flush();
        };

        return { flush, push };
    }

    /** Construct summary. */
    private constructSummary(): RetrieveRecordsSummary {
        return {
            byteCount: this.parser?.info.bytes ?? -1,
            commentLineCount: this.parser?.info.comment_lines ?? -1,
            emptyLineCount: this.parser?.info.empty_lines ?? -1,
            invalidFieldLengthCount: this.parser?.info.invalid_field_length ?? -1,
            lineCount: this.parser?.info.lines ?? -1,
            recordCount: this.parser?.info.records ?? -1
        };
    }

    /** Write to parser. */
    private writeToParser(chunk: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.parser?.write(chunk, (error) => {
                if (error) reject(error);
                else resolve();
            });
        });
    }
}

/** Exports */
export type { Options as ParseOptions, Parser } from 'csv-parse/browser/esm';
export { Tool };
