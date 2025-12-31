/**
 * CSV Parse tool.
 */

// Vendor dependencies.
import { parse, type Options as ParseOptions, type Parser } from 'csv-parse/browser/esm';

// Framework dependencies.
import type { EngineUtilities } from '@datapos/datapos-shared/engine';
import { buildFetchError, ignoreErrors } from '@datapos/datapos-shared/errors';
import type { ConnectionColumnConfig, RetrieveRecordsOptions, RetrieveRecordsSummary } from '@datapos/datapos-shared/component/connector';
import type { ParseResult, RecordDelimiterId, ValueDelimiterId } from '@datapos/datapos-shared/component/dataView';

/**
 * Parse record and parsed record buffer.
 */
type SchemaParsedRecord = { value: string | null | undefined; isQuoted: boolean }[];
type StreamParsedRecord = string[];
interface StreamRecordBuffer {
    push: (record: StreamParsedRecord) => void;
    flush: () => void;
}

/**
 * Schema configuration.
 */
interface SchemaConfig {
    columnConfigs: ConnectionColumnConfig[];
    recordDelimiterId: RecordDelimiterId;
    records: ParseResult[][];
    valueDelimiterId: ValueDelimiterId;
}

// Constants.
const DEFAULT_RECORD_BUFFER_SIZE = 10_000;
const DEFAULT_RECORD_BUFFER_POOL_SIZE = 4;

/** Tool. */
class Tool {
    /** Build parser. */
    buildParser(options: ParseOptions): Parser {
        return parse(options);
    }

    /**
     * Determine schema configuration.
     */
    async determineSchemaConfig(engineUtilities: EngineUtilities, text: string, delimiters: ValueDelimiterId[]): Promise<SchemaConfig> {
        const recordDelimiterId = determineRecordDelimiter(text);
        const { records, valueDelimiterId } = await determineValueDelimiter(text, delimiters);

        const castRecords: ParseResult[][] = [];
        const columnConfigs: ConnectionColumnConfig[] = [];
        for (const record of records) {
            const parsedResult = engineUtilities.parseRecord(columnConfigs, record, true);
            castRecords.push(parsedResult);
        }

        let firstDataRowIndex = 0;
        const headerRecord = castRecords[0];
        if (headerRecord) {
            const headerValueCount = castRecords.length;
            for (let headerValueIndex = 0; headerValueIndex < headerValueCount; headerValueIndex++) {
                // eslint-disable-next-line security/detect-object-injection
                const headerLabel = headerRecord[headerValueIndex]?.originalValue ?? `Column ${headerValueIndex}`;
                // eslint-disable-next-line security/detect-object-injection
                const xxxx = columnConfigs[headerValueIndex];
                if (xxxx == null) continue;
                xxxx.label = { en: headerLabel };
            }
            firstDataRowIndex = 1;
        }

        return { columnConfigs, recordDelimiterId, records: castRecords, valueDelimiterId };
    }

    /**
     * Parse stream.
     */
    async parseStream(
        retrieveRecordsOptions: RetrieveRecordsOptions,
        parseOptions: ParseOptions,
        url: string,
        abortController: AbortController,
        chunk: (records: (string[] | Record<string, unknown>)[]) => void
    ): Promise<RetrieveRecordsSummary> {
        return new Promise<RetrieveRecordsSummary>((resolve, reject) => {
            let parser: Parser | undefined;
            let reader: ReadableStreamDefaultReader<Uint8Array> | undefined;
            let recordBuffer: StreamRecordBuffer | undefined;
            let hasErrored = false;
            let hasStoppedProcessing = false;

            const stopProcessing = (): void => {
                if (hasStoppedProcessing) return;
                hasStoppedProcessing = true;

                const activeParser = parser;
                parser = undefined;
                recordBuffer = undefined;
                if (activeParser != null) {
                    ignoreErrors(() => activeParser.removeAllListeners());
                    ignoreErrors(() => activeParser.end());
                }
                ignoreErrors(() => void reader?.cancel());
                reader = undefined;
            };

            abortController.signal.addEventListener('abort', stopProcessing, { once: true });

            const handleError = (error: unknown): void => {
                if (hasErrored) return;

                hasErrored = true;
                stopProcessing();
                if (!abortController.signal.aborted) abortController.abort(error);
                reject(error as Error);
            };

            const run = async (): Promise<void> => {
                parser = parse(parseOptions);
                recordBuffer = constructRecordBuffer({ chunk, chunkSize: retrieveRecordsOptions.chunkSize ?? DEFAULT_RECORD_BUFFER_SIZE });
                parser.on('readable', () => {
                    try {
                        if (parser == null || recordBuffer == null) return;
                        let record: StreamParsedRecord | null;
                        while ((record = parser.read() as StreamParsedRecord | null) != null) {
                            if (hasErrored) return;
                            abortController.signal.throwIfAborted();
                            recordBuffer.push(record);
                        }
                    } catch (error) {
                        handleError(error);
                    }
                });
                parser.on('error', (error) => handleError(error));
                parser.on('end', () => {
                    if (hasErrored) return;
                    recordBuffer?.flush();
                    resolve(constructSummary(parser));
                });

                const response = await fetch(encodeURI(url), { signal: abortController.signal });
                if (!response.ok || response.body == null) {
                    throw await buildFetchError(response, `Failed to fetch '${url}' file.`, 'datapos-connector-file-store-emulator|Connector|retrieve');
                }

                reader = response.body.getReader();
                const decoder = new TextDecoder(retrieveRecordsOptions.encodingId);
                let result = await reader.read();
                while (!result.done) {
                    if (hasErrored) return;
                    abortController.signal.throwIfAborted();
                    const decodedChunk = decoder.decode(result.value, { stream: true });
                    if (decodedChunk.length > 0) parser.write(decodedChunk);
                    result = await reader.read();
                }

                if (hasErrored) return;

                const finalChunk = decoder.decode();
                if (finalChunk.length > 0) parser.write(finalChunk);
                parser.end();
            };

            void run().catch((error: unknown) => handleError(error));
        });
    }
}

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//#region: Determine schema helpers.

/**
 * Determine record delimiter.
 */
function determineRecordDelimiter(text: string): RecordDelimiterId {
    const countCRLF = (text.match(/\r\n/g) ?? []).length; // Count all '\r\n'character sequences.
    const countLF = (text.match(/(?<!\r)\n/g) ?? []).length; // Count all '\n' characters not preceded by '\r' character.
    const countCR = (text.match(/\r(?!\n)/g) ?? []).length; // Count all '\r' characters not followed by '\n' character.
    if (countCRLF >= countLF && countCRLF >= countCR) return '\r\n';
    if (countLF >= countCRLF && countLF >= countCR) return '\n';
    if (countCR >= countCRLF && countCR >= countLF) return '\r';
    return '\n'; // Default to '\n' character if all counts are equal or zero.
}

/**
 * Determine value delimiter.
 */
async function determineValueDelimiter(text: string, delimiters: ValueDelimiterId[]): Promise<{ records: SchemaParsedRecord[]; valueDelimiterId: ValueDelimiterId }> {
    let valueDelimiterId: ValueDelimiterId | undefined;
    let priorAverageCount: number;
    let priorSumCountDiffs: number;
    let records: SchemaParsedRecord[] = [];

    /* TODO: Could improve performance by limiting the number of delimiters
       processed by exiting if column count is the same for each line and
       by ordering delimiters in most common usage. Could also consider
       parallel parsing. Maybe group by most common delimiters and then by
       less common? */

    for (const delimiter of delimiters) {
        try {
            let totalValueCount = 0;
            let priorValueCount: number | undefined;
            let recordCount = 0;
            let sumOfValueCountDiffs = 0;

            const parser = parse({
                cast: (value, context): { value: string; isQuoted: boolean } => ({ value, isQuoted: context.quoting }),
                delimiter,
                relax_column_count: true
            });
            await new Promise<void>((resolve): void => {
                try {
                    const pendingRecords: SchemaParsedRecord[] = [];
                    parser.on('readable', (): void => {
                        let record;
                        while ((record = parser.read() as { value: string | null | undefined; isQuoted: boolean }[] | null) != null) {
                            recordCount++;
                            const valueCount = record.length;
                            if (priorValueCount != null) sumOfValueCountDiffs += Math.abs(valueCount - priorValueCount);
                            priorValueCount = valueCount;
                            totalValueCount += valueCount;
                            pendingRecords.push(record);
                        }
                    });
                    parser.on('error', (): void => resolve()); // Ignore errors. Assume invalid delimiter caused parsing error.
                    parser.on('end', (): void => {
                        const averageValueCount = totalValueCount / recordCount;
                        console.log(1111, totalValueCount, recordCount, averageValueCount);
                        if ((!priorSumCountDiffs || sumOfValueCountDiffs <= priorSumCountDiffs) && (!priorAverageCount || averageValueCount > priorAverageCount)) {
                            valueDelimiterId = delimiter;
                            priorAverageCount = averageValueCount;
                            priorSumCountDiffs = sumOfValueCountDiffs;
                            records = [...pendingRecords];
                        }
                        resolve();
                    });
                    parser.write(text);
                    parser.end();
                } catch {
                    resolve(); // Ignore errors. Assume invalid delimiter caused parsing error.
                }
            });
        } catch {
            // Ignore errors. Assume invalid delimiter caused parsing error.
        }
    }

    return { records, valueDelimiterId: valueDelimiterId ?? ',' };
}

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//#region: Parse stream helpers.

/**
 * Construct record buffer.
 */
function constructRecordBuffer(bufferOptions: { chunk: (records: StreamParsedRecord[]) => void; chunkSize: number }): StreamRecordBuffer {
    const recordsPerChunk = Math.max(1, Math.floor(bufferOptions.chunkSize));
    const pool: StreamParsedRecord[][] = [];
    let records = allocateBuffer();
    let recordCount = 0;

    const flush = (): void => {
        if (recordCount === 0) return;
        const recordsToEmit = records;
        recordsToEmit.length = recordCount; // Trim before handing off so consumers only see populated entries.
        records = allocateBuffer();
        recordCount = 0;
        bufferOptions.chunk(recordsToEmit);
        if (pool.length < DEFAULT_RECORD_BUFFER_POOL_SIZE) pool.push(recordsToEmit);
    };

    const push = (record: StreamParsedRecord): void => {
        records[recordCount++] = record;
        if (recordCount >= recordsPerChunk) flush();
    };

    return { flush, push };

    function allocateBuffer(): StreamParsedRecord[] {
        const pooled = pool.pop();
        if (pooled != null) {
            pooled.length = 0;
            return pooled;
        }

        const allocated = Array.from<StreamParsedRecord>({ length: recordsPerChunk });
        allocated.length = 0;
        return allocated;
    }
}

/** Construct summary. */
function constructSummary(parser: Parser | undefined): RetrieveRecordsSummary {
    return {
        byteCount: parser?.info.bytes ?? -1,
        commentLineCount: parser?.info.comment_lines ?? -1,
        emptyLineCount: parser?.info.empty_lines ?? -1,
        nonUniformRecordCount: parser?.info.invalid_field_length ?? -1,
        lineCount: parser?.info.lines ?? -1,
        recordCount: parser?.info.records ?? -1
    };
}

//#endregion ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Exports.
export type { Options as ParseOptions, Parser } from 'csv-parse/browser/esm';
export { type StreamParsedRecord, type SchemaConfig, Tool };
