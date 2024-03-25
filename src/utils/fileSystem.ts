import fs from 'node:fs'
import path from 'node:path'
import { warn } from '../log'

export function readGitignore() {
  let gitignore = ''
  try {
    gitignore = fs
      .readFileSync(path.resolve(process.cwd(), '.gitignore'))
      .toString()
  } catch (err) {
    if (
      typeof err === 'object' &&
      err !== null &&
      'code' in err &&
      err.code === 'ENOENT'
    ) {
      warn('.gitignore file not found.')
    } else if (typeof err === 'object' && err !== null && 'message' in err) {
      warn('Error while reading .gitignore: \n\t' + err.message)
    }
  }
  return gitignore
}

export function readdir(
  dirPath: string,
  gitignore: string,
  fileList: string[] = []
): string[] {
  const files = fs.readdirSync(dirPath)
  files.forEach((file) => {
    const filePath = path.join(dirPath, file)
    const fileStat = fs.statSync(filePath)
    if (fileStat.isDirectory()) {
      if (filePath.includes('node_modules') === false) {
        readdir(filePath, gitignore, fileList)
      }
    } else {
      if (gitignore.includes(file) === false) {
        fileList.push(filePath)
      }
    }
  })
  return fileList
}

export function readFileContent(filePath: string) {
  return fs.readFileSync(filePath, 'utf-8')
}
