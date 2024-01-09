import { generate } from "random-words";
import { DefSet, WordList } from "../types/types";

export function getWord(
  user: DefSet,
  setUser: React.Dispatch<React.SetStateAction<DefSet>>
) {
  const word = generate({ maxLength: user.maxSize, minLength: user.minSize })

  const wordList: WordList[][] = []

  for (let i = 0; i < word.length; i++) {
    const subArr: WordList[] = []

    for (let j = 0; j <= 5; j++) {
      subArr.push({
        content: word[i],
        guessed: {
          content: '',
          correct: false,
        }
      })
    }

    wordList.push(subArr)
  }

  setUser({ maxSize: user.maxSize, minSize: user.minSize, word: `${word}`, wordList: wordList })

  // console.log(word)
  // console.log(wordList)

  return wordList
}