# Data Positioning CSV Parse Tool

[![npm version](https://img.shields.io/npm/v/@dpuse/dpuse-tool-csv-parse.svg)](https://www.npmjs.com/package/@dpuse/dpuse-tool-csv-parse)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

<!-- DEPENDENCY_LICENSES_START -->

| Name                | Type | Installed | Latest  | Latest Released        | Deps | Document                                                                     |
| :------------------ | :--- | :-------: | :-----: | :--------------------- | ---: | :--------------------------------------------------------------------------- |
| @dpuse/dpuse-shared | MIT  |  0.3.622  | 0.3.622 | this month: 2026-04-18 |    0 | [LICENSE](https://raw.githubusercontent.com/dpuse/dpuse-shared/main/LICENSE) |
| csv-parse           | MIT  |   6.2.1   |  6.2.1  | this month: 2026-03-20 |    0 | [LICENSE](https://raw.githubusercontent.com/adaltas/node-csv/master/LICENSE) |

<!-- DEPENDENCY_LICENSES_END -->

<!-- BUNDLE_START -->

The Bundle Analysis Report is generated automatically on each release using [Sonda](https://sonda.dev/), which analyses final source maps to reveal the actual effects of tree-shaking and minification rather than relying on pre-build estimates.

_Note: Sonda's Vite reports currently exclude CSS files, since Vite does not generate source maps for CSS._

|Chunk/Module/File|Composition|
|:------ |:-----------|
| dist/dpuse-tool-csv-parse.es.js | 109.2 kB · brotli 24.5 kB |
| &nbsp;&nbsp;&nbsp;&nbsp;csv-parse → dist/esm/index.js | `██████████████████░░` 90.9% |
| &nbsp;&nbsp;&nbsp;&nbsp;(unassigned) → [unassigned] | `█░░░░░░░░░░░░░░░░░░░` 4.8% |
| &nbsp;&nbsp;&nbsp;&nbsp;src → index.ts | `█░░░░░░░░░░░░░░░░░░░` 3.3% |
| &nbsp;&nbsp;&nbsp;&nbsp;@dpuse/dpuse-shared → dist/dpuse-shared-errors.es.js | `░░░░░░░░░░░░░░░░░░░░` 1.0% |

<!-- BUNDLE_END -->
