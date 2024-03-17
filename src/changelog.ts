import { globSync as glob } from 'glob'
import fs from 'node:fs'
import fileToPath from './utils/fileToPath'
import resolveConfig from './config/resolveConfig'
import warn from './log/warn'
import error from './log/error'
import info from './log/info'

const pattern = ['changelog.md', 'CHANGELOG.md']

const files = glob(pattern, {
  ignore: 'node_modules'
})

const file = files[0]

const packageJson = (
  await import(fileToPath('package.json'), {
    assert: {
      type: 'json'
    }
  })
).default

const config = resolveConfig()

const allowNonWritedChangelog = config?.allowNonWritedChangelog

function getVersion(header: string): string {
  return header
    .split('-')[0]
    .replaceAll('[', '')
    .replaceAll(']', '')
    .replaceAll('##', '')
    .trim()
}

function findMarkdownHeader(filePath: string = file): string {
  const regex = /^(##\s+.+)$/m
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const match = regex.exec(fileContent)

  if (!match) {
    error('No markdown header found.')
    process.exit(1)
  }

  let header = match[1]

  if (header.includes('[Unreleased]')) {
    const nextMatch = regex.exec(
      fileContent.slice(match.index + match[0].length)
    )
    if (nextMatch) {
      header = nextMatch[1]
    } else {
      error('No next markdown header found after "Unreleased".')
      process.exit(1)
    }
  }

  return header
}

export default function compareVersions() {
  const header = findMarkdownHeader(file)
  const version = getVersion(header)
  if (version !== packageJson.version) {
    if (allowNonWritedChangelog) {
      warn(
        `The package.json version and last CHANGELOG version are not the same. package.json: ${packageJson.version} changelog: ${version}`
      )
    } else {
      error(
        `The package.json version and last CHANGELOG version are not the same. package.json: ${packageJson.version} changelog: ${version}`
      )
      process.exit(1)
    }
  } else {
    info('CHANGELOG.md and package.json version match.')
  }
}
