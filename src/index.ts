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
    async parseStream(
        parseOptions: ParseOptions,
        retrieveRecordsOptions: RetrieveRecordsOptions,
        url: string,
        signal: AbortSignal,
        onError: (error: unknown) => void,
        onComplete: (summary: RetrieveRecordsSummary) => void
    ): Promise<void> {
        let parser: Parser | undefined;
        let reader: ReadableStreamDefaultReader<string> | undefined;
        let rowBuffer: RowBuffer | undefined;
        let hasErrored = false;

        const handleError = (error: unknown, destroyParser = false): void => {
            if (hasErrored) return;
            hasErrored = true;
            void reader?.cancel();
            rowBuffer?.flush();
            if (destroyParser) parser?.destroy(error as Error);
            onError(error);
        };

        try {
            console.log(2222);
            parser = parse(parseOptions);
            rowBuffer = this.constructRowBuffer({ chunk: retrieveRecordsOptions.chunk, chunkSize: retrieveRecordsOptions.chunkSize ?? DEFAULT_RETRIEVE_CHUNK_SIZE });
            parser.on('readable', () => {
                try {
                    if (parser == null || rowBuffer == null) return;
                    let row: Row | null;
                    while ((row = parser.read() as Row | null) != null) {
                        signal.throwIfAborted();
                        rowBuffer.push(row);
                    }
                } catch (error) {
                    handleError(error, true);
                }
            });
            parser.on('error', (error) => handleError(error));
            parser.on('end', () => {
                if (hasErrored) return;
                rowBuffer?.flush();
                onComplete(this.constructSummary(parser));
            });

            const response = await fetch(encodeURI(url), { signal });
            if (!response.ok || response.body == null) {
                throw await buildFetchError(response, `Failed to fetch '${url}' file.`, 'datapos-connector-file-store-emulator|Connector|retrieve');
            }

            reader = response.body.pipeThrough(new TextDecoderStream(retrieveRecordsOptions.encodingId)).getReader();
            let result = await reader.read();
            while (!result.done) {
                signal.throwIfAborted();
                await this.writeToParser(parser, result.value);
                result = await reader.read();
            }

            console.log(7777);
            parser.end();
        } catch (error) {
            console.log(8888);
            handleError(error, true);
        }
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
}

/** Exports */
export type { Options as ParseOptions, Parser } from 'csv-parse/browser/esm';
export { Tool };
