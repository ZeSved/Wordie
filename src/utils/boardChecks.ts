import { DefSet } from "../types/types";

export function getValues(u: DefSet) {
  const correct: number[][] = []

  if (u.wordList.length > 0) {
    for (let i = 0; i <= u.curRow; i++) {
      const values: number[] = []
      let count = 0

      values.push(i)

      for (let j = 0; j < u.wordList[i].length; j++) {
        if (u.wordList[i][j].guessed.correct) {
          count += 1
        }
      }

      values.push(count)
      correct.push(values)
    }
    return { full: correct, last: correct[correct.length - 1][1] }
  }
  return { full: [], last: [] }
}

export function getProgress(u: DefSet) {
  let newCount = 0
  const all = getValues(u).full

  if (u.curRow === 1) {
    u.wordList[0].forEach(t => {
      if (t.guessed.correct) newCount += 1
    })

    return (100 / u.word.length) * newCount
  }

  for (let i = 0; i <= u.curRow; i++) {
    for (let j = 0; j < u.wordList[i].length; j++) {
      if (all[0][0] > j) continue

      const arr: number[][] = []
      if (arr.length > 0) {
        for (let k = 0; k < arr.length; k++) {
          if (arr[k].includes(j)) continue
        }
      }

      if (u.wordList[i][j].guessed.correct) {
        arr.push([i, j])
        newCount += 1
      }
    }
  }

  return (100 / u.word.length) * newCount
}