import resolveConfig, { Config } from './config/resolveConfig'
import { error, warn, info } from './log'
import { includesAnyOfThem } from './utils'
import { readGitignore, readdir, readFileContent } from './utils/fileSystem'

export default function check() {
  if (resolveConfig()?.ignoredChecks?.includes('comment')) return
  const config = resolveConfig()
  const gitignore = readGitignore()
  const comments = ['TODO', 'FIXME', 'BUG']
  const files = readdir(process.cwd(), gitignore)
  const commentList: string[] = []

  files.forEach((file) => {
    if (fileEndsWithValidExtension(file)) {
      const content = readFileContent(file)
      if (
        includesAnyOfThem(
          comments.map((comment) => '//' + comment),
          content
        ) ||
        includesAnyOfThem(
          comments.map((comment) => '/*' + comment + '*/'),
          content
        )
      ) {
        commentList.push(file)
      }
    }
  })

  if (commentList.length > 0) {
    handleComments(commentList, config)
  } else {
    info('No comments found.')
  }
}

function fileEndsWithValidExtension(file: string) {
  return ['.ts', '.js', '.tsx', '.jsx', '.mts', '.mjs', '.cts', '.cjs'].some(
    (ext) => file.endsWith(ext)
  )
}

function handleComments(commentList: string[], config?: Partial<Config>) {
  const { allowComments } = config || {
    allowComments: false
  }
  const count = commentList.length
  const message = `Founded ${count} comments in: \n\t${commentList.join(
    '\n\t'
  )}`

  if (allowComments == true) {
    warn(message)
  } else {
    error(message)
    process.exit(1)
  }
}
