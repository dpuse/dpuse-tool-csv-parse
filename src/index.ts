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
const DEFAULT_RETRIEVE_CHUNK_SIZE = 65_536; // 64KB.

/** Tool. */
class Tool {
    /** Build parser. */
    buildParser(options: ParseOptions): Parser {
        return parse(options);
    }

    /** Parse stream. */
    async parseStream(
        parseOptions: ParseOptions,
        retrieveRecordsOptions: RetrieveRecordsOptions,
        url: string,
        abortController: AbortController,
        chunk: (records: (string[] | Record<string, unknown>)[]) => void
    ): Promise<RetrieveRecordsSummary> {
        return new Promise<RetrieveRecordsSummary>((resolve, reject) => {
            let parser: Parser | undefined;
            let reader: ReadableStreamDefaultReader<string> | undefined;
            let rowBuffer: RowBuffer | undefined;
            let hasErrored = false;
            let hasStoppedProcessing = false;

            const stopProcessing = (): void => {
                if (hasStoppedProcessing) return;
                hasStoppedProcessing = true;

                const activeParser = parser;
                parser = undefined;
                rowBuffer = undefined;
                if (activeParser != null) {
                    this.ignoreErrors(() => activeParser.removeAllListeners());
                    this.ignoreErrors(() => activeParser.end());
                }
                this.ignoreErrors(() => void reader?.cancel());
                reader = undefined;
            };

            const handleError = (error: unknown): void => {
                if (hasErrored) return;

                hasErrored = true;
                stopProcessing();
                if (!abortController.signal.aborted) abortController.abort(error);
                reject(error as Error);
            };

            abortController.signal.addEventListener('abort', stopProcessing, { once: true });

            const run = async (): Promise<void> => {
                parser = parse(parseOptions);
                rowBuffer = this.constructRowBuffer({ chunk, chunkSize: retrieveRecordsOptions.chunkSize ?? DEFAULT_RETRIEVE_CHUNK_SIZE });
                parser.on('readable', () => {
                    try {
                        if (parser == null || rowBuffer == null) return;
                        let row: Row | null;
                        while ((row = parser.read() as Row | null) != null) {
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
                    if (hasErrored) return;
                    abortController.signal.throwIfAborted();
                    parser.write(result.value);
                    result = await reader.read();
                }

                if (hasErrored) return;
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
