import { generate } from "random-words";
import { Action, Game, Token } from "../types/types";

export function newGame(
  dispatch: React.Dispatch<Action>,
  { difficulty: d }: Game,
) {
  const word = generate({
    maxLength: d === "easy" ? 4 : d === "medium" ? 6 : 8,
    minLength: d === "easy" ? 3 : d === "medium" ? 5 : 7,
  })
  // const word = 'house'

  dispatch({ type: "set-word", payload: typeof word === 'string' ? word : word.join('') })
  dispatch({ type: "set-word-list", payload: createContent(word) })
  dispatch({ type: "set-cur_row", payload: 0 })
  dispatch({ type: "set-progress", payload: 0 })
  dispatch({ type: "set-time", payload: 0 })
}

function createContent(word: string | string[]) {
  const wordList: Token[][] = []

  for (let i = 0; i <= 5; i++) {
    const subArr: Token[] = []

    for (let j = 0; j < word.length; j++) {
      subArr.push({
        content: word[j].toUpperCase(),
        guessed: {
          existsAnywhere: false,
          content: '',
          correct: false,
        },
      })
    }

    wordList.push(subArr)
  }

  return wordList
}