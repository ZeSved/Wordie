import { Action, DefSet, Token } from "../types/types"

const ALLOWED_LETTERS = /^[a-zA-Z]$/

export function handleKeyboardInput(
  e: KeyboardEvent,
  user: DefSet,
  dispatch: React.Dispatch<Action>,
  progress: number[],
  setProgress: React.Dispatch<React.SetStateAction<number[]>>
) {
  const index = helper.findFirstInRow(user)
  const curRowArr = user.wordList[user.curRow]
  const allTime = JSON.parse(window.localStorage.getItem('allTimeStats')!)

  // If any alphabetic key was pressed
  if (ALLOWED_LETTERS.test(e.key)) {
    if (index === -1) return
    const { guessed: guess, content }: Token = curRowArr[index]

    guess.content = e.key.toUpperCase()
    guess.correct = content === guess.content
    guess.existsAnywhere = !guess.correct ? user.word.includes(e.key) : false

    if (!progress.includes(index) && guess.correct) { setProgress([...progress, index]) }

    return helper.updateWordList(user.wordList, dispatch)
  }

  // If the Backspade key was pressed
  if (e.key === 'Backspace') {
    if (index === 0) return

    const prevLetterIndex = (index === -1 ? user.word.length : index) - 1

    if (user.curRow === 0) {
      if (progress.includes(prevLetterIndex)) {
        progress.splice(progress.indexOf(prevLetterIndex), 1)
      }
    }

    for (let i = 0; i <= user.curRow; i++) {
      if (!user.wordList[i][prevLetterIndex].guessed.correct && progress.includes(prevLetterIndex)) {
        progress.splice(progress.indexOf(prevLetterIndex), 1)
      }
    }

    curRowArr[prevLetterIndex].guessed.content = ''
    return helper.updateWordList(user.wordList, dispatch)
  }

  // If the Enter key was pressed
  if (e.key === 'Enter') {
    if (index !== -1) return
    const lastRow = helper.checkCurrentRow(user)

    dispatch({ type: "set-progress", payload: (100 / user.word.length) * progress.length })

    if (lastRow) {
      dispatch({ type: "set-status", payload: "won" })

      helper.updateSave(true, allTime)

      return helper.updateCurrentRow(dispatch, user)
    }

    if (user.curRow === 5) {
      dispatch({ type: "set-status", payload: "lost" })

      helper.updateSave(false, allTime)

      return helper.updateCurrentRow(dispatch, user)
    }

    return helper.updateCurrentRow(dispatch, user)
  }
}

class helper {
  static updateWordList(wordList: Token[][] | undefined, dispatch: React.Dispatch<Action>) {
    wordList && dispatch({ type: 'set-word-list', payload: wordList })
  }

  static updateCurrentRow(dispatch: React.Dispatch<Action>, user: DefSet,) {
    dispatch({ type: "set-cur_row", payload: user.curRow + 1 })
  }

  static updateSave(won = false, allTime: any) {
    allTime.games.played += 1
    if (won) allTime.games.won += 1
    window.localStorage.setItem('allTimeStats', JSON.stringify(allTime))
  }

  static findFirstInRow(u: DefSet) {
    if (u.wordList.length > 0) {
      return u.wordList[u.curRow].findIndex(e => e.guessed.content.length <= 0)
    } else {
      return 0
    }
  }

  static checkCurrentRow(u: DefSet) {
    for (let i = 0; i < u.wordList[u.curRow].length; i++) {
      if (u.wordList[u.curRow][i].guessed.correct) continue
      else return false
    }

    return true
  }

  static findNumberOfOccurences() {
    const regexOfOccurance = /^.*(.).*\1.*$/
    let timesOfOccurrence = 1
    // let matchingAmount = '*\1.*'

    for (let i = 0; i <= timesOfOccurrence; i++) {

    }


  }
}