/**
 * CSV Parse tool class.
 */

/** Dependencies - Vendor. */
import { type Options, parse, type Parser } from 'csv-parse/browser/esm';

/** Classes - CSV Parse tool. */
class Tool {
    /** Operations - Build parser. */
    buildParser(options: Options): Parser {
        return parse(options);
    }
}

/** Exposures */
export type { Options, Parser } from 'csv-parse/browser/esm';
export { Tool };
