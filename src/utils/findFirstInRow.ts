import { DefSet } from "../types/types";

export function findFirstInRow(u: DefSet) {
  console.log(u.wordList)
  return u.wordList[u.curRow].findIndex(e => e.guessed.content.length <= 0)
}