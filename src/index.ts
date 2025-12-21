/**
 * CSV Parse tool class.
 */

/** Dependencies - Vendor. */
import { parse } from 'csv-parse/browser/esm';

/** Interfaces/Types */
type CSVParse = typeof parse;

/** Classes - CSV Parse tool. */
class CSVParseTool {
    getParser(): typeof parse {
        return parse;
    }
}

/** Exposures */
export { type CSVParse, CSVParseTool };
