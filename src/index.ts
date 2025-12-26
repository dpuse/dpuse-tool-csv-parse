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
const DEFAULT_ROW_BUFFER_SIZE = 10_000; // Row count.
const DEFAULT_ROW_BUFFER_POOL_SIZE = 4;

/** Tool. */
class Tool {
    /** Build parser. */
    buildParser(options: ParseOptions): Parser {
        return parse(options);
    }

    /** Parse stream. */
    async parseStream(
        retrieveRecordsOptions: RetrieveRecordsOptions,
        parseOptions: ParseOptions,
        url: string,
        abortController: AbortController,
        chunk: (records: (string[] | Record<string, unknown>)[]) => void
    ): Promise<RetrieveRecordsSummary> {
        return new Promise<RetrieveRecordsSummary>((resolve, reject) => {
            let parser: Parser | undefined;
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
                rowBuffer = this.constructRowBuffer({ chunk, chunkSize: retrieveRecordsOptions.chunkSize ?? DEFAULT_ROW_BUFFER_SIZE });
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

                const decodedStream = response.body; //.pipeThrough(new TextDecoderStream(retrieveRecordsOptions.encodingId));
                const writable = new WritableStream<string>({
                    write: (chunkText): void => {
                        if (hasErrored) return;
                        if (chunkText.length === 0) return;
                        abortController.signal.throwIfAborted();
                        parser?.write(chunkText);
                    },
                    close: (): void => {
                        if (hasErrored) return;
                        parser?.end();
                    },
                    abort: (error): void => {
                        if (hasErrored) return;
                        handleError(error);
                    }
                });

                await decodedStream.pipeTo(writable, { signal: abortController.signal });
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
        const rowsPerChunk = Math.max(1, Math.floor(bufferOptions.chunkSize));
        const pool: Row[][] = [];
        let rows = allocateBuffer();
        let rowCount = 0;

        const flush = (): void => {
            if (rowCount === 0) return;
            const rowsToEmit = rows;
            rowsToEmit.length = rowCount; // Trim before handing off so consumers only see populated entries.
            rows = allocateBuffer();
            rowCount = 0;
            bufferOptions.chunk(rowsToEmit);
            if (pool.length < DEFAULT_ROW_BUFFER_POOL_SIZE) pool.push(rowsToEmit);
        };

        const push = (row: Row): void => {
            rows[rowCount++] = row;
            if (rowCount >= rowsPerChunk) flush();
        };

        return { flush, push };

        function allocateBuffer(): Row[] {
            const pooled = pool.pop();
            if (pooled != null) {
                pooled.length = 0;
                return pooled;
            }

            const allocated = Array.from<Row>({ length: rowsPerChunk });
            allocated.length = 0;
            return allocated;
        }
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
