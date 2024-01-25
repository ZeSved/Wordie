import { generate } from "random-words";
import { DefSet, Action } from "../types/types";
import { createContent } from "./createContent";

export function generateWord(user: DefSet, dispatch: React.Dispatch<Action>) {
  const word = generate({
    maxLength: user.maxSize ?? user.minSize + 1,
    minLength: user.minSize ?? user.maxSize - 1,
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
}