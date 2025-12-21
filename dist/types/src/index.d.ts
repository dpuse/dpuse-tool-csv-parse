import { parse } from 'csv-parse/browser/esm';
/** Interfaces/Types */
type CSVParse = typeof parse;
/** Classes - CSV Parse tool. */
declare class CSVParseTool {
    getParser(): typeof parse;
}
/** Exposures */
export { type CSVParse, CSVParseTool };
