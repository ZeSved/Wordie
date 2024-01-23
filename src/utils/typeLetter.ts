import { DefSet, WordList } from "../types/types"
import { findFirstInRow } from "./findFirstInRow"

export function typeLetter(e: KeyboardEvent, user: DefSet) {
  const index = findFirstInRow(user)
  const newArr = [...user.wordList]

  if (newArr) {
    console.log(newArr)
    const indexedArr = newArr[user.curRow][index]
    const indexedGuess = indexedArr.guessed

    switch (true) {
      case /^[a-z]$/.test(e.key):
        if (newArr[user.curRow][newArr[user.curRow].length - 1].guessed.content) return

        indexedGuess.content = e.key.toUpperCase()
        if (indexedArr.content === indexedGuess.content)
          indexedGuess.correct = true
        break
      case e.key === 'Backspace':
        if (
          // newArr[indexesOfFirst.index1].length <= 0 ||
          newArr[user.curRow].length <= 0
        )
          return

        newArr[user.curRow][index - 1].guessed.content = ''
        break
    }
  }

  return newArr
}