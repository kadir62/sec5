import chalk from 'chalk'

export default function info(
  message: string,
  from: `${string}` = 'SEC5'
): void {
  console.log(chalk.blue(`[${from} INFO] ${message}`))
}
