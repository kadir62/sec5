export default function includesAnyOfThem(
  them: string[],
  str: string
): boolean {
  for (let i = 0; i < them.length; i++) {
    if (str.includes(them[i])) {
      return true
    }
  }
  return false
}
