/**
 * CSV Parse tool class.
 */

/** Dependencies - Vendor. */
import { parse } from 'csv-parse/browser/esm';

/** Classes - CSV Parse tool. */
class CSVParseTool {
    getParser(): any {
        return parse;
    }
}

/** Exposures */
export { CSVParseTool };
