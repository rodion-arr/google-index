# Google index CLI tool

![Test](https://github.com/rodion-arr/google-index/workflows/Test/badge.svg)
[![codecov](https://codecov.io/gh/rodion-arr/google-index/branch/main/graph/badge.svg)](https://codecov.io/gh/rodion-arr/google-index)
<span class="badge-npmversion"><a href="https://npmjs.org/package/google-index" title="View this project on NPM"><img src="https://img.shields.io/npm/v/google-index.svg" alt="NPM version" /></a></span>

This is CLI tool for retrieving data from Google search pages.

Functionality available:

- Get count of indexed pages for you sites `google-index count`

## Usage

### As global package

```bash
npm i -g google-index

google-index

You must specify the command to run

google-index <command> [options]

Commands:
  google-index count  Count amount of pages in Google index

Options:
  --help     Show help                                    [boolean]
  --version  Show version number                          [boolean]
```

### As NPX script

```bash
npx google-index --version
```

### Programmatic API

```javascript
const { count } = require('google-index')

(async () => {
    console.log(await count(['github.com']))
})()

// [ { site: 'github.com', count: 66700 } ]
```

## Available commands

### 1. Get count of pages in Google index

Accepts `--sites` option with JSON array of sites' domains (without protocol `https://`).

Returns array parsed data.

```bash
$ google-index count --sites='["example.com","example2.com"]'
[
  { site: 'example.com', count: 8080 },
  { site: 'example2.com', count: 1210 }
]
```

#### 1.1 Running `count` command under root user

`count` command accepts `--under-root=true\fales` option.

Passing `true` will disable Chromium sanboxing during pages parsing.
Using this option is less secure so use it at your own risk.
