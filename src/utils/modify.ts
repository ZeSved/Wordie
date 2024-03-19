export function shorten(num: number) {
  return num.toString().length > 3 ? num.toString().substring(0, 4) : num
}

export function capitalize(word: string) {
  const newWord = word.split('')

  newWord[0] = newWord[0].toUpperCase()
  return newWord.join('')
}