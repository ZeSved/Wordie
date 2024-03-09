import { Action, Game } from "../types/types";

export function reducer(game: Game, action: Action): Game {
  switch (action.type) {
    case 'set-word':
      const rootElm = document.documentElement
      rootElm.style.setProperty('--word-length', action.payload.length.toString());

      return {
        ...game,
        word: action.payload
      }
    case 'set-word-list':
      return {
        ...game,
        wordList: action.payload
      }
    case 'set-cur_row':
      return {
        ...game,
        curRow: action.payload
      }
    case 'set-status':
      return {
        ...game,
        status: action.payload
      }
    case 'set-progress':
      return {
        ...game,
        progress: action.payload
      }
    case 'set-difficulty':
      return {
        ...game,
        difficulty: action.payload
      }
    case 'set-time':
      return {
        ...game,
        timeTaken: action.payload
      }
    case 'set-toast':
      return {
        ...game,
        toast: action.payload
      }
  }
}