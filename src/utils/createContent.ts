import { Token } from "../types/types"

export function createContent(word: string) {
  const wordList: Token[][] = []

  for (let i = 0; i <= 5; i++) {
    const subArr: Token[] = []

    for (let j = 0; j < word.length; j++) {
      subArr.push({
        content: word[j].toUpperCase(),
        guessed: {
          content: '',
          correct: false,
        },
      })
    }

    wordList.push(subArr)
  }

  return wordList
}