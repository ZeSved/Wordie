import { DefSet } from "../types/types";

export function findFirstInRow(u: DefSet) {
  if (u.wordList.length > 0) {
    return u.wordList[u.curRow].findIndex(e => e.guessed.content.length <= 0)
  } else {
    return 0
  }
}