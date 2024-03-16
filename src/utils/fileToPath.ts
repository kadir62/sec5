import path from 'node:path'

export default function (filename: string): string {
  return 'file://' + path.resolve(process.cwd(), filename)
}
