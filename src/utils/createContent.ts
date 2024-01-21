import { WordList } from "../types/types"

export function createContent(word: string) {
  const wordList: WordList[][] = []

  for (let i = 0; i <= 5; i++) {
    const subArr: WordList[] = []

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