import { Action, DefSet, Token } from "../types/types"

import { findFirstInRow } from "./findFirstInRow"

const ALLOWED_LETTERS = /^[a-z]$/

export function typeLetter(e: KeyboardEvent, user: DefSet, dispatch: React.Dispatch<Action>) {
  const index = findFirstInRow(user)

  function updateWordList(wordList: Token[][] | undefined) {
    wordList && dispatch({ type: 'set-word-list', payload: wordList })
  }

  function checkIfWon() {
    for (let i = 0; i < user.word.length; i++) {
      if (!user.wordList[user.curRow][i].guessed.correct) {
        return false
      }
    }

    return true
  }

  function updateCurrentRow() {
    dispatch({ type: "set-cur_row", payload: user.curRow + 1 })
  }

  function lettersInWord(letter: string) {
    let count = 0
    for (let i = 0; i < user.word.length; i++) {
      if (user.word.toString().charAt(i) === letter) count++
    }

    return true
  }

  if (ALLOWED_LETTERS.test(e.key)) {
    if (index === -1) return
    const { guessed: guess, content }: Token = user.wordList[user.curRow][index]

    guess.content = e.key.toUpperCase()
    guess.correct = content === guess.content
    guess.existsAnywhere = user.word.includes(e.key) && !guess.correct ? lettersInWord(e.key) : false

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

    if (checkIfWon()) {
      dispatch({ type: "set-status", payload: "won" })
      return updateCurrentRow()
    }

    if (user.curRow === 5) {
      dispatch({ type: "set-status", payload: "lost" })
    }

    return updateCurrentRow()
  }
}