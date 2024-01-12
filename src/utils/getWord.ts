import { generate } from "random-words";
import { Action, DefSet, WordList } from "../types/types";

export function getWord(
  user: DefSet,
  dispatch: React.Dispatch<Action>
) {
  const word = generate({ maxLength: user.maxSize ?? user.minSize + 1, minLength: user.minSize ?? user.maxSize - 1 })

  const wordList: WordList[][] = []

  for (let i = 0; i < word.length; i++) {
    const subArr: WordList[] = []

    for (let j = 0; j <= 5; j++) {
      subArr.push({
        content: word[i].toUpperCase(),
        guessed: {
          content: '',
          correct: false,
        }
      })
    }

    wordList.push(subArr)
  }

  dispatch({ type: "set-word", payload: `${word}` })
  dispatch({ type: "set-word-list", payload: wordList })

  // console.log(word)
  // console.log(wordList)

  return wordList
}