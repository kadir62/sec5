import chalk from 'chalk'

export default function error(
  message: string,
  from: `${string}` = 'SEC5'
): void {
  console.error(chalk.red(`[${from} ERR] ${message}`))
}
