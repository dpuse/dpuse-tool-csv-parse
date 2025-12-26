/**
 * CSV Parse tool.
 */

/** Vendor dependencies. */
import { parse, type Options as ParseOptions, type Parser } from 'csv-parse/browser/esm';

/** Framework dependencies. */
import { buildFetchError } from '@datapos/datapos-shared/errors';
import type { RetrieveRecordsOptions, RetrieveRecordsSummary } from '@datapos/datapos-shared/component/connector';

/** Row and row buffer. */
type Row = string[];
interface RowBuffer {
    push: (row: Row) => void;
    flush: () => void;
}

/** Constants. */
const DEFAULT_RETRIEVE_CHUNK_SIZE = 4096;

/** Tool. */
class Tool {
    /** Build parser. */
    buildParser(options: ParseOptions): Parser {
        return parse(options);
    }

    /** Parse stream. */
    async parseStream(parseOptions: ParseOptions, retrieveRecordsOptions: RetrieveRecordsOptions, url: string, abortController: AbortController): Promise<RetrieveRecordsSummary> {
        return new Promise<RetrieveRecordsSummary>((resolve, reject) => {
            let parser: Parser | undefined;
            let reader: ReadableStreamDefaultReader<string> | undefined;
            let rowBuffer: RowBuffer | undefined;
            let hasErrored = false;

            const handleError = (error: unknown): void => {
                if (hasErrored) return;
                console.log('handleError 1');

                hasErrored = true;
                console.log('handleError 2');
                if (!abortController.signal.aborted) abortController.abort(error);
                console.log('handleError 3');
                this.ignoreErrors(() => void reader?.cancel());
                console.log('handleError 4');
                reject(error as Error);
                console.log('handleError 5');
            };

            const run = async (): Promise<void> => {
                parser = parse(parseOptions);
                rowBuffer = this.constructRowBuffer({ chunk: retrieveRecordsOptions.chunk, chunkSize: retrieveRecordsOptions.chunkSize ?? DEFAULT_RETRIEVE_CHUNK_SIZE });
                parser.on('readable', () => {
                    try {
                        console.log(2222);
                        if (parser == null || rowBuffer == null) return;
                        let row: Row | null;
                        while ((row = parser.read() as Row | null) != null) {
                            console.log(9999);
                            if (hasErrored) return;
                            abortController.signal.throwIfAborted();
                            rowBuffer.push(row);
                        }
                    } catch (error) {
                        handleError(error);
                    }
                });
                parser.on('error', (error) => handleError(error));
                parser.on('end', () => {
                    if (hasErrored) return;
                    rowBuffer?.flush();
                    resolve(this.constructSummary(parser));
                });

                const response = await fetch(encodeURI(url), { signal: abortController.signal });
                if (!response.ok || response.body == null) {
                    throw await buildFetchError(response, `Failed to fetch '${url}' file.`, 'datapos-connector-file-store-emulator|Connector|retrieve');
                }

                reader = response.body.pipeThrough(new TextDecoderStream(retrieveRecordsOptions.encodingId)).getReader();
                let result = await reader.read();
                while (!result.done) {
                    console.log(1111.1);
                    if (hasErrored) return;
                    console.log(1111.2);
                    abortController.signal.throwIfAborted();
                    await this.writeToParser(parser, result.value);
                    result = await reader.read();
                }

                parser.end();
            };

            void run().catch((error: unknown) => handleError(error));
        });
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
    private constructSummary(parser: Parser | undefined): RetrieveRecordsSummary {
        return {
            byteCount: parser?.info.bytes ?? -1,
            commentLineCount: parser?.info.comment_lines ?? -1,
            emptyLineCount: parser?.info.empty_lines ?? -1,
            invalidFieldLengthCount: parser?.info.invalid_field_length ?? -1,
            lineCount: parser?.info.lines ?? -1,
            recordCount: parser?.info.records ?? -1
        };
    }

    /** Write to parser. */
    private writeToParser(parser: Parser, chunk: string): Promise<void> {
        return new Promise((resolve, reject) => {
            parser.write(chunk, (error) => {
                if (error) reject(error);
                else resolve();
            });
        });
    }

    /** Ignore best-effort cleanup errors to keep teardown noise-free. */
    private ignoreErrors(action: () => void): void {
        try {
            action();
        } catch {
            /* Intentionally ignore errors. */
        }
    }
}

/** Exports */
export type { Options as ParseOptions, Parser } from 'csv-parse/browser/esm';
export { Tool };
