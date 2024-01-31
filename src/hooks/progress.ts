import { useState } from "react"
import { DefSet } from "../types/types"

export function useProgress({ wordList: list, word }: DefSet) {
  const [correct, setCorrect] = useState([])
  const [exists, setexists] = useState([])

  const correctPercentage = 100 / word.length
  const existsPercentage = correctPercentage / (word.length * 6)

  const progressData = {
    indexes: {
      correct: correct,
      exists: exists
    },
    progress: 0
  }

  // TODO: calculate if there is an initial value

  // TODO: calculate the percentage each correct/existing letter should give depending
  // TODO: on the length of the word

  // TODO: fill arrays with only necessary/non-used indexes

  return
}