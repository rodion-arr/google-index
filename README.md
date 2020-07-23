# Google index CLI tool

![Test](https://github.com/rodion-arr/google-index-count/workflows/Test/badge.svg)

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
