import { DefSet } from "../types/types"
import { findFirstInRow } from "./findFirstInRow"

export function typeLetter(e: KeyboardEvent, user: DefSet) {
  const index = findFirstInRow(user)
  const newArr = [...user.wordList]
  const indexedArr = newArr.length > 0 ? newArr[user.curRow][index] : newArr[0][0]

  switch (true) {
    case /^[a-z]$/.test(e.key):
      // if (newArr[user.curRow][newArr[user.curRow].length - 1].guessed.content) return

      indexedArr.guessed.content = e.key.toUpperCase()
      if (indexedArr.content === indexedArr.guessed.content)
        indexedArr.guessed.correct = true
      break
    case e.key === 'Backspace':
      if (
        // newArr[indexesOfFirst.index1].length <= 0 ||
        newArr[user.curRow].length <= 0
      )
        return

      // newArr[user.curRow][indexesOfFirst.index2 - 1].guessed.content = ''
      break
  }

  return newArr
}