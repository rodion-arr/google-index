# Google index CLI tool

![Test](https://github.com/rodion-arr/google-index/workflows/Test/badge.svg)
<span class="badge-npmversion"><a href="https://npmjs.org/package/google-index" title="View this project on NPM"><img src="https://img.shields.io/npm/v/google-index.svg" alt="NPM version" /></a></span>
<span class="badge-daviddm"><a href="https://david-dm.org/rodion-arr/google-index" title="View the status of this project's dependencies on DavidDM"><img src="https://img.shields.io/david/rodion-arr/google-index.svg" alt="Dependency Status" /></a></span>
<span class="badge-daviddmdev"><a href="https://david-dm.org/rodion-arr/google-index#info=devDependencies" title="View the status of this project's development dependencies on DavidDM"><img src="https://img.shields.io/david/dev/rodion-arr/google-index.svg" alt="Dev Dependency Status" /></a></span>

This is CLI tool for retreiving data from Google search pages.

Functionality available:

- Get count of indexed pages for you sites `google-index count`

## Installation

```bash
npm i -g google-index
```

## Usage

```bash
$ google-index
You must specify the command to run

google-index <command> [options]

Commands:
  google-index count  Count amount of pages in Google index

Options:
  --help     Show help                                    [boolean]
  --version  Show version number                          [boolean]
```

### 1. Get count of pages in Google index

Accepts `--sites` option with JSON array of sites' domains (without protocol `https://`).

Returns array parsed data.

```bash
$ google-index count --sites='["exmaple.com","exmaple2.com"]'
[
  { site: 'exmaple.com', count: 8080 },
  { site: 'exmaple2.com', count: 1210 }
]
```
