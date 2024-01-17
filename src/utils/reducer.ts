import { Action, DefSet } from "../types/types";

export function reducer(user: DefSet, action: Action): DefSet {
  switch (action.type) {
    case 'set-min-size':
      return {
        ...user,
        minSize: action.payload
      }
    case 'set-max-size':
      return {
        ...user,
        maxSize: action.payload
      }
    case 'set-word':
      return {
        ...user,
        word: action.payload
      }
    case 'set-word-list':
      return {
        ...user,
        wordList: action.payload
      }
    case 'set-cur_row':
      return {
        ...user,
        curRow: action.payload
      }
  }
}