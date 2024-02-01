import { useState } from "react"
import { DefSet } from "../types/types"

export function useProgress({ wordList: list, word, curRow }: DefSet) {
  const [correct, setCorrect] = useState<number[]>([])
  const [exists, setExists] = useState<number[]>([])

  const correctPercentage = 100 / word.length
  const existsPercentage = correctPercentage / (word.length * 6)

  function getIndexInWord(ltr: string) {
    const indexes: number[] = []

    for (let i = 0; i < word.length; i++) {
      if (word[i] === ltr) indexes.push(i)
    }

    return indexes
  }

  const progressData = {
    indexes: {
      correct: correct,
      exists: exists
    },
    progress: 0
  }

  for (let i = 0; i < word.length; i++) {
    if (!correct.includes(i) && list[curRow][i].guessed.correct) setCorrect([...correct, i])
  }



  // TODO: calculate if there is an initial value

  // TODO: fill arrays with only necessary/non-used indexes

  return
}