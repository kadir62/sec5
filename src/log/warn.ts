import chalk from 'chalk'

export default function warn(
  message: string,
  from: `${string}` = 'SEC5'
): void {
  console.warn(chalk.yellow(`[${from} WARN] ${message}`))
}
