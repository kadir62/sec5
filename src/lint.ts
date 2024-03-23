import { exec } from 'node:child_process'
import warn from './log/warn'
import info from './log/info'
import error from './log/error'
import resolveConfig from './config/resolveConfig'

const command = 'eslint .'

const config = resolveConfig()

const allowNoLint = config?.allowNoLint

export default function eslintCheck() {
  if (config?.ignoredChecks?.includes('eslint')) return
  exec(command, (err, _, stderr) => {
    if (err && stderr.toLowerCase().includes('✖')) {
      if (allowNoLint == true) {
        warn('Codes are not writed correctly for rules')
      } else {
        error('Codes are not writed correctly for rules')
        process.exit(1)
      }
    } else if (err) {
      warn('An error occurred during eslint check. Error:')
      console.warn('\t' + stderr)
    } else {
      info('Codes are writed correctly for rules with eslint')
    }
  })
}
