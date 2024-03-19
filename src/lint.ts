import { exec } from 'node:child_process'
import warn from './log/warn'
import info from './log/info'
import error from './log/error'
import resolveConfig from './config/resolveConfig'

const command = 'eslint .'

const config = resolveConfig()

const allowNoLint = config?.allowNoLint

export default function eslintCheck() {
  exec(command, (err, _, stderr) => {
    if (err && stderr.toLowerCase().includes('✖')) {
      if (allowNoLint == true) {
        warn('Codes are not writed correctly for rules')
      } else {
        error('Codes are not writed correctly for rules')
        process.exit(1)
      }
    } else if (err) {
      error('An error occurred during eslint check. Error:')
      console.error('\t' + stderr)
    } else {
      info('Codes are writed correctly for rules with eslint')
    }
  })
}
