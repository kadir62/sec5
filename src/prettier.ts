import { exec } from 'node:child_process'
import warn from './log/warn'
import info from './log/info'
import error from './log/error'
import resolveConfig from './config/resolveConfig'

const command = 'prettier --check .'

const config = resolveConfig()

const allowNoFormat = config?.allowNoFormat

export default function prettierCheck() {
  if (config?.ignoredChecks?.includes('prettier')) return
  exec(command, (err, _, stderr) => {
    if (err && stderr.toLowerCase().includes('run prettier to fix.')) {
      if (allowNoFormat == true) {
        warn('Codes are not formatted correctly')
      } else {
        error('Codes are not formatted correctly')
        process.exit(1)
      }
    } else if (err) {
      error('An error occurred during Prettier check. Error:')
      console.error('\t' + stderr)
    } else {
      info('Codes are formatted correctly with Prettier')
    }
  })
}
