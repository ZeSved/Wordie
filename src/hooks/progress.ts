import { useState } from "react"

export function useProgress() {
  const [correct, setCorrect] = useState([])
  const progressData = {
    indexes: {
      correct: [],
      exists: []
    },
    progress: 0
  }

  // TODO: calculate if there is an initial value

  // TODO: calculate the percentage each correct/existing letter should give depending
  // TODO: on the length of the word

  // TODO: fill arrays with only necessary/non-used indexes

  return
}