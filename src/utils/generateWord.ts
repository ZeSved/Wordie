import { generate } from "random-words";
import { Action } from "../types/types";
import { createContent } from "./createContent";

export function generateWord(dispatch: React.Dispatch<Action>) {
  const word = generate({
    maxLength: 20,
    minLength: 3,
  })
  // const word = 'house'

  dispatch({
    type: 'set-word',
    payload: word,
  })

  dispatch({
    type: 'set-word-list',
    payload: createContent(word),
  })

  dispatch({ type: "set-cur_row", payload: 0 })
  dispatch({ type: "set-progress", payload: 0 })
}