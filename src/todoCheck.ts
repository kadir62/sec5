import resolveConfig from './config/resolveConfig'
import fs from 'node:fs'
import path from 'node:path'
import error from './log/error'
import warn from './log/warn'

const config = resolveConfig()
const gitignore = fs.readFileSync(path.resolve(process.cwd(), '.gitignore'))

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

export default function todoCheck() {
  const files = readdir(process.cwd())
  const todoList: string[] = []
  files.forEach((file) => {
    if (
      file.endsWith('.ts') ||
      file.endsWith('.js') ||
      file.endsWith('.tsx') ||
      file.endsWith('.jsx')
    ) {
      const content = fs.readFileSync(file, 'utf-8')
      if (content.includes('// TODO')) {
        todoList.push(file)
      }
    }
  })
  if (config?.allowTodo == true) {
    warn(`Founded ${todoList.length} TODOs in: \n\t${todoList.join('\n\t')}`)
  } else {
    error(`Founded ${todoList.length} TODOs in: \n\t${todoList.join('\n\t')}`)
    process.exit(1)
  }
}
