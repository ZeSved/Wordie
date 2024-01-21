import { DefSet } from "../types/types"
import { boardCheck } from "./boardCheck"

export function typeLetter(e: KeyboardEvent, user: DefSet) {
  const indexesOfFirst = boardCheck(user)
  const newArr = [...user.wordList]
  const indexedArr = newArr[indexesOfFirst.index1][indexesOfFirst.index2]

  switch (true) {
    case /^[a-z]$/.test(e.key):
      if (
        indexesOfFirst.index1 === user.curRow &&
        (indexesOfFirst.index2 === 0 ||
          indexesOfFirst.index2 === newArr[0].length - 1)
      )
        return

      indexedArr.guessed.content = e.key.toUpperCase()
      if (indexedArr.content === indexedArr.guessed.content)
        indexedArr.guessed.correct = true
      break
    case e.key === 'Backspace':
      if (
        newArr[indexesOfFirst.index1].length <= 0 ||
        newArr[user.curRow].length <= 0
      )
        return

      newArr[user.curRow][indexesOfFirst.index2 - 1].guessed.content = ''
      break
  }

  return newArr
}