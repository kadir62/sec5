# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Module (`.mjs | .mts`) and Commonjs (`.cjs | .cts`) extension support
- `ignoredChecks` option for ignoring some checks.
- A new minimalist logo. [Preview](https://i.imgur.com/gq3DFIV.png)
- Comment check for JSDoc comments. (`/* */`)
- More readable warn when no config file found.

### Changed

- When prettier check fails, output writed by `warn` instead of `error`.

## [0.1.5]

### Changed

- The codes are seperated to functions and files for reability.
- When lint check fails, output writed by `warn` instead of `error`.

## [0.1.4]

### Fixed

- Error when trying to get `.gitignore` but `.gitignore` doesn't exist
- Error when trying to get `CHANGELOG.md` but `CHANGELOG.md` doesn't exist

## [0.1.3]

### Added

- `includesAnyOfThem` function for modularity.
- Added `files` option in the `package.json` for more performance.

## [0.1.2]

> **🎉 NOTE** <br />
> This version is the first release of Sec5.

### Added

- `Eslint` check
- Information about `ESlint` check
- More detailed `package.json`

### Fixed

- `Prettier` check doesn't exit and close the process

## [0.1.1]

### Added

- `Version` check.
- Information about `// TODO` check
- Refactored `// TODO` check for performance
- `Prettier` check.
- `// FIXME`, `// BUG` checks.

### Changed

- `// TODO` check merged with `// FIXME` and `// BUG` check.
- `allowTodo` changed to `allowComments`

## [0.1.0]

### Added

- `// TODO` check.
- `CHANGELOG.md` and `package.json` version check.
- `resolveConfig` function
- Configuration
