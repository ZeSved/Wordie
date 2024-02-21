import { Action, DefSet, Token } from "../types/types"
import { allTimeStats } from "../App"

const ALLOWED_LETTERS = /^[a-zA-Z]$/

export function handleKeyboardInput(
  e: KeyboardEvent,
  user: DefSet,
  dispatch: React.Dispatch<Action>,
  progress: number[],
  setProgress: React.Dispatch<React.SetStateAction<number[]>>,
  guesses: string[],
  setGuesses: React.Dispatch<React.SetStateAction<string[]>>,
) {
  const index = helper.findFirstInRow(user)
  const curRowArr = user.wordList[user.curRow]
  const allTime = JSON.parse(window.localStorage.getItem('allTimeStats') ?? JSON.stringify(allTimeStats))

  // If any alphabetic key was pressed
  if (ALLOWED_LETTERS.test(e.key)) {
    if (index === -1) return
    const { guessed: guess, content }: Token = curRowArr[index]
    const remainingGuess = user.word.split('').filter((x) => x === e.key.toLowerCase()).length > guesses.filter((x) => x === e.key.toLowerCase()).length

    guess.content = e.key.toUpperCase()
    guess.correct = content === guess.content

    if (remainingGuess) {
      guess.existsAnywhere = !guess.correct ? user.word.includes(e.key.toLowerCase()) : false

      setGuesses([...guesses, e.key.toLowerCase()])
    }

    if (guess.correct && !remainingGuess) {
      const newArr = [...guesses]

      newArr.splice(newArr.indexOf(e.key.toLowerCase()), 1)
      user.wordList[user.curRow][user.wordList[user.curRow]
        .indexOf(user.wordList[user.curRow].find(x => x.guessed.content === guess.content)!)].guessed.existsAnywhere = false

      helper.updateWordList(user.wordList, dispatch)

      setGuesses(newArr)
    }

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

      helper.updateSave(true, allTime, user)
      setGuesses([])

      return helper.updateCurrentRow(dispatch, user)
    }

    if (user.curRow === 5) {
      dispatch({ type: "set-status", payload: "lost" })

      helper.updateSave(false, allTime, user)
      setGuesses([])

      return helper.updateCurrentRow(dispatch, user)
    }

    setGuesses([])
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

  static updateSave(won = false, allTime: any, u: DefSet) {
    allTime.games.played += 1
    if (won) {
      allTime.games.won += 1
    }
    allTime.averageCorrectPerSecond = u.word.length / u.timeTaken

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
}