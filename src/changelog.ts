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

const allowNoVersion = config?.allowNoVersion

function findMarkdownHeaders(filePath: string = file): string[] {
  const headers: string[] = []
  const regex = /^##\s+(.+)/gm

  const fileContent = fs.readFileSync(filePath, 'utf-8')

  let match
  while ((match = regex.exec(fileContent)) !== null) {
    headers.push(match[0])
  }

  return headers
}

function getVersion(header: string): string {
  return header
    .split('-')[0]
    .replaceAll('[', '')
    .replaceAll(']', '')
    .replaceAll('##', '')
    .trim()
}

export default function compareVersions() {
  const headers = findMarkdownHeaders(file)
  // ? Why not `0`
  // Because `0` is [Unreleased]
  const version = getVersion(headers[1])
  if (version !== packageJson.version) {
    if (allowNoVersion) {
      warn(
        `The package.json version and last CHANGELOG version are not same. package.json: ${packageJson.version} changelog: ${version}`
      )
    } else {
      error(
        `The package.json version and last CHANGELOG version are not same. package.json: ${packageJson.version} changelog: ${version}`
      )
      process.exit(1)
    }
  } else {
    info('CHANGELOG.md and package.json version matches.')
  }
}
