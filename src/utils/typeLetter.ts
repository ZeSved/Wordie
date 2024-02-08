import { Action, DefSet, Token } from "../types/types"

import { findFirstInRow, getValues } from "./boardChecks"

const ALLOWED_LETTERS = /^[a-zA-Z]$/

export function typeLetter(
  e: KeyboardEvent,
  user: DefSet,
  dispatch: React.Dispatch<Action>,
  progress: number[],
  setProgress: React.Dispatch<React.SetStateAction<number[]>>
) {
  const index = findFirstInRow(user)
  const curRowArr = user.wordList[user.curRow]
  const allTime = JSON.parse(window.localStorage.getItem('allTimeStats')!)

  function updateWordList(wordList: Token[][] | undefined) {
    wordList && dispatch({ type: 'set-word-list', payload: wordList })
  }

  function updateCurrentRow() {
    dispatch({ type: "set-cur_row", payload: user.curRow + 1 })
  }

  if (ALLOWED_LETTERS.test(e.key)) {
    if (index === -1) return
    const { guessed: guess, content }: Token = curRowArr[index]

    guess.content = e.key.toUpperCase()
    guess.correct = content === guess.content
    guess.existsAnywhere = !guess.correct ? user.word.includes(e.key) : false

    if (!progress.includes(index) && guess.correct) { setProgress([...progress, index]) }

    return updateWordList(user.wordList)
  }

  if (e.key === 'Backspace') {
    if (index === 0) return

    const prevLetterIndex = (index === -1 ? user.word.length : index) - 1

    for (let i = 0; i < user.curRow; i++) {
      if (!user.wordList[i][prevLetterIndex].guessed.correct && progress.includes(prevLetterIndex)) {
        progress.splice(progress.indexOf(prevLetterIndex))
      }
    }

    curRowArr[prevLetterIndex].guessed.content = ''
    return updateWordList(user.wordList)
  }

  if (e.key === 'Enter') {
    if (index !== -1) return
    const lastRow = getValues(user).last

    dispatch({ type: "set-progress", payload: (100 / user.word.length) * progress.length })

    if (lastRow === user.word.length) {
      dispatch({ type: "set-status", payload: "won" })

      allTime.games.played += 1
      allTime.games.won += 1
      window.localStorage.setItem('allTimeStats', JSON.stringify(allTime))

      return updateCurrentRow()
    }

    if (user.curRow === 5) {
      dispatch({ type: "set-status", payload: "lost" })

      allTime.games.played += 1
      window.localStorage.setItem('allTimeStats', JSON.stringify(allTime))

      return updateCurrentRow()
    }

    return updateCurrentRow()
  }
}