/**
 * CSV Parse tool class.
 */

/** Dependencies - Vendor. */
import { type Options, parse, type Parser } from 'csv-parse/browser/esm';

import { extractExtensionFromPath } from '@datapos/datapos-shared/utilities';

/** Classes - CSV Parse tool. */
class Tool {
    /** Operations - Build parser. */
    buildParser(options: Options): Parser {
        const xxxx = extractExtensionFromPath('abcde.xyz');
        console.log(xxxx);
        return parse(options);
    }
}

/** Exposures */
export type { Options, Parser } from 'csv-parse/browser/esm';
export { Tool };
