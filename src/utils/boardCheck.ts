import { DefSet } from "../types/types";

export function boardCheck(user: DefSet) {
  for (let i1 = 0; i1 < user.wordList.length; i1++) {
    for (let i2 = 0; i2 < user.wordList[i1].length; i2++) {
      const hasGuessed = user.wordList[i1][i2].guessed.content !== ''
      if (hasGuessed) continue
      return { index1: i1, index2: i2 }
    }
  }

  return { index1: 0, index2: 0 }
}