import { globSync as glob } from 'glob'
import fileToPath from '../utils/fileToPath'
import warn from '../log/warn'

export type Config = {
  allowNonWritedChangelog: boolean
  allowComments: boolean
  allowNoVersion: boolean
  allowNoFormat: boolean
  allowNoLint: boolean
  ignoredChecks: ('eslint' | 'prettier' | 'changelog' | 'version' | 'format' | 'comment')[]
}

const pattern = [
  'sec5.config.js',
  'sec5.js',
  'sec.config.js',
  'sec.js',
  'secure.config.js',
  'secure.js'
]

const files = glob(pattern)

let config: {
  default?: Partial<Config>
  config?: Partial<Config>
}

if (files.length === 0)
  warn('No config files found with this pattern: ' + pattern.join(', '))
else {
  const file = files[0]
  config = await import(fileToPath(file))
}

export default function resolveConfig(): Partial<Config> | undefined {
  return config?.default || config?.config
}
