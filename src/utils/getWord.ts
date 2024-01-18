import { generate } from "random-words";
import { Action, DefSet, WordList } from "../types/types";

export function getWord(
  user: DefSet,
  dispatch: React.Dispatch<Action>
) {
  // const word = generate({ maxLength: user.maxSize ?? user.minSize + 1, minLength: user.minSize ?? user.maxSize - 1 })
  const word = 'house'

  const wordList: WordList[][] = []

  for (let i = 0; i <= 5; i++) {
    const subArr: WordList[] = []

    for (let j = 0; j < word.length; j++) {
      subArr.push({
        content: word[j].toUpperCase(),
        guessed: {
          content: '',
          correct: false,
        }
      })
    }

    wordList.push(subArr)
  }

  console.log(wordList)

  dispatch({ type: "set-word", payload: word })
  dispatch({ type: "set-word-list", payload: wordList })

  console.log(user.word)
  console.log(user.wordList)
}