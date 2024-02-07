import { Action, DefSet } from "../types/types";

export function reducer(user: DefSet, action: Action): DefSet {
  switch (action.type) {
    case 'set-word':
      const rootElm = document.documentElement
      rootElm.style.setProperty('--word-length', action.payload.length.toString());

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
    case 'set-status':
      return {
        ...user,
        status: action.payload
      }
    case 'set-progress':
      return {
        ...user,
        progress: action.payload
      }
    case 'set-difficulty':
      return {
        ...user,
        difficulty: action.payload
      }
  }
}