import { generate } from "random-words";
import { Action, Game } from "../types/types";
import { createContent } from "./createContent";

export function newGame(
  dispatch: React.Dispatch<Action>,
  { difficulty: d }: Game,
) {
  const word = generate({
    maxLength: d === "easy" ? 4 : d === "medium" ? 6 : d === "hard" ? 8 : 10,
    minLength: d === "easy" ? 3 : d === "medium" ? 5 : d === "hard" ? 7 : 9,
  })
  // const word = 'house'

  dispatch({ type: "set-word", payload: typeof word === 'string' ? word : word.join('') })
  dispatch({ type: "set-word-list", payload: createContent(word) })
  dispatch({ type: "set-cur_row", payload: 0 })
  dispatch({ type: "set-progress", payload: 0 })
  dispatch({ type: "set-time", payload: 0 })
}