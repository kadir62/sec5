import error from './log/error'
import warn from './log/warn'
import resolveConfig from './config/resolveConfig'
import fileToPath from './utils/fileToPath'

const packageJson = (
  await import(fileToPath('package.json'), {
    assert: {
      type: 'json'
    }
  })
).default

const config = resolveConfig()

const allowNoVersion = config?.allowNoVersion

export default function versionCheck() {
  if (packageJson.version === null || packageJson.version === undefined) {
    if (allowNoVersion === true) {
      warn(
        `Package do not have any version. package.json: \n\r${fileToPath(
          'package.json'
        )}`
      )
    } else {
      error(
        `Package do not have any version. package.json: \n\r${fileToPath(
          'package.json'
        )}`
      )
      process.exit(1)
    }
  }
}
