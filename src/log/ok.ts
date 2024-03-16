import chalk from 'chalk'

export default function ok(
  message: string,
  from: `${string}` = 'SEC5'
): void {
  console.log(chalk.blue(`[${from} OK] ${message}`))
}
