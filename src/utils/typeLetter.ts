import { Action, DefSet, Token } from "../types/types"

import { findFirstInRow } from "./findFirstInRow"

const ALLOWED_LETTERS = /^[a-z]$/

export function typeLetter(e: KeyboardEvent, user: DefSet, dispatch: React.Dispatch<Action>) {
  const index = findFirstInRow(user)

  function updateWordList(wordList: Token[][] | undefined) {
    wordList && dispatch({ type: 'set-word-list', payload: wordList })
  }

  if (ALLOWED_LETTERS.test(e.key)) {
    if (index === -1) return
    const { guessed: guess, content }: Token = user.wordList[user.curRow][index]

    guess.content = e.key.toUpperCase()
    guess.correct = content === guess.content
    guess.existsAnywhere = !guess.correct ? user.word.includes(e.key) : guess.existsAnywhere

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

    return dispatch({ type: "set-cur_row", payload: user.curRow + 1 })
  }
}