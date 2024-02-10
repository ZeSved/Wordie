export function shorten(num: number) {
  return num.toString().length > 3 ? num.toString().substring(0, 4) : num
}