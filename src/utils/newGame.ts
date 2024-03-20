// import { generate } from "random-words";
import { Action, Game, Language, Token } from "../types/types";
import { words as list } from '../constants/words'

export function newGame(
  dispatch: React.Dispatch<Action>,
  { difficulty: d, language: l }: Game,
) {
  const numberOfCharachters: Length = `${Math.floor(Math.random() * (
    (d === "easy" ? 4 : d === "medium" ? 6 : 8) -
    (d === "easy" ? 3 : d === "medium" ? 5 : 7) + 1) +
    (d === "easy" ? 3 : d === "medium" ? 5 : 7)).toString() as Length}`
  const index: keyof typeof list.english = `letters_${numberOfCharachters}`
  const language = l as Language

  const collection = list[language][index]
  const word = collection[Math.floor(Math.random() * ((collection.length - 1) - 0 + 1) + 0)]

  dispatch({ type: "set-word", payload: word })
  dispatch({ type: "set-word-list", payload: createContent(word) })
  dispatch({ type: "set-cur_row", payload: 0 })
  dispatch({ type: "set-progress", payload: 0 })
  dispatch({ type: "set-time", payload: 0 })
  dispatch({ type: 'set-started', payload: false })

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

type Length = '3' | '4' | '5' | '6' | '7' | '8'