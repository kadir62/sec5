import resolveConfig from './config/resolveConfig'
import fs from 'node:fs'
import path from 'node:path'
import error from './log/error'
import warn from './log/warn'
import info from './log/info'

const config = resolveConfig()
const gitignore = fs.readFileSync(path.resolve(process.cwd(), '.gitignore'))

const comments = { todo: '// TODO', fixme: '// FIXME', bug: '// BUG' }

function readdir(dirPath: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dirPath)
  files.forEach((file) => {
    const filePath = path.join(dirPath, file)
    const fileStat = fs.statSync(filePath)
    if (fileStat.isDirectory()) {
      if (filePath.includes('node_modules') === false) {
        readdir(filePath, fileList)
      }
    } else {
      if (gitignore.includes(file) === false) {
        fileList.push(filePath)
      }
    }
  })
  return fileList
}

export default function check() {
  const files = readdir(process.cwd())
  const commnetList: string[] = []
  files.forEach((file) => {
    if (
      file.endsWith('.ts') ||
      file.endsWith('.js') ||
      file.endsWith('.tsx') ||
      file.endsWith('.jsx')
    ) {
      const content = fs.readFileSync(file, 'utf-8')
      if (
        content.includes(comments.todo) ||
        content.includes(comments.fixme) ||
        content.includes(comments.bug)
      ) {
        commnetList.push(file)
      }
    }
  })
  if (commnetList.length > 0) {
    if (config?.allowComments == true) {
      warn(
        `Founded ${commnetList.length} comments in: \n\t${commnetList.join(
          '\n\t'
        )}`
      )
    } else {
      error(
        `Founded ${commnetList.length} comments in: \n\t${commnetList.join(
          '\n\t'
        )}`
      )
      process.exit(1)
    }
  } else {
    info('No comments found.')
  }
}
