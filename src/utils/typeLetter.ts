import { Action, DefSet, Token } from "../types/types"

import { findFirstInRow, getValues } from "./boardChecks"

const ALLOWED_LETTERS = /^[a-z]$/

export function typeLetter(e: KeyboardEvent, user: DefSet, dispatch: React.Dispatch<Action>, progress: number[], setprogress: React.Dispatch<React.SetStateAction<number[]>>) {
  const index = findFirstInRow(user)

  function updateWordList(wordList: Token[][] | undefined) {
    wordList && dispatch({ type: 'set-word-list', payload: wordList })
  }

  function updateCurrentRow() {
    dispatch({ type: "set-cur_row", payload: user.curRow + 1 })
  }

  if (ALLOWED_LETTERS.test(e.key)) {
    if (index === -1) return
    const { guessed: guess, content }: Token = user.wordList[user.curRow][index]

    guess.content = e.key.toUpperCase()
    guess.correct = content === guess.content
    guess.existsAnywhere = !guess.correct ? user.word.includes(e.key) : false

    if (!progress.includes(index) && guess.correct) { setprogress([...progress, index]) }

    return updateWordList(user.wordList)
  }

  if (e.key === 'Backspace') {
    if (index === 0) return

    const prevLetterIndex = (index === -1 ? user.word.length : index) - 1

    user.wordList[user.curRow][prevLetterIndex].guessed.content = ''
    return updateWordList(user.wordList)
  }

  if (e.key === 'Enter') {
    if (index !== -1) return

    dispatch({ type: "set-progress", payload: (100 / user.word.length) * (progress.length > 1 ? progress.length : 1) })

    if (getValues(user).last === user.word.length) {
      dispatch({ type: "set-status", payload: "won" })
      return updateCurrentRow()
    }

    if (user.curRow === 5) {
      dispatch({ type: "set-status", payload: "lost" })
      return updateCurrentRow()
    }


    return updateCurrentRow()
  }
}