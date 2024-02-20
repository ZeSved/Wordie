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

    guess.content = e.key.toUpperCase()
    guess.correct = content === guess.content

    if (helper.getAmount(user.word.split(''), e.key.toLowerCase())
      > helper.getAmount(guesses, e.key.toLowerCase())) {
      guess.existsAnywhere = !guess.correct ? user.word.includes(e.key.toLowerCase()) : false

      setGuesses([...guesses, e.key.toLowerCase()])
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

    // curRowArr.forEach(obj => {
    //   const ob = curRowArr.find(r => r.content === obj.guessed.content)

    //   if (!obj.guessed.correct && user.word.includes(e.key) && ob) {
    //     obj.guessed.existsAnywhere = true
    //   }
    // })

    // helper.updateWordList(user.wordList, dispatch)
    // curRowArr.forEach(obj => {

    // })

    // []

    dispatch({ type: "set-progress", payload: (100 / user.word.length) * progress.length })

    if (lastRow) {
      dispatch({ type: "set-status", payload: "won" })

      helper.updateSave(true, allTime, user)

      return helper.updateCurrentRow(dispatch, user)
    }

    if (user.curRow === 5) {
      dispatch({ type: "set-status", payload: "lost" })

      helper.updateSave(false, allTime, user)

      return helper.updateCurrentRow(dispatch, user)
    }

    return helper.updateCurrentRow(dispatch, user)
  }
}

class helper {
  static updateWordList(wordList: Token[][] | undefined, dispatch: React.Dispatch<Action>) {
    wordList && dispatch({ type: 'set-word-list', payload: wordList })
  }

  static getAmount(arr: string[], key: string) {
    return arr.filter((x) => x === key).length
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

  static findNumberOfOccurences(list: Token[], letter: string) {
    let exists = 0
    let matched = 0

    list.forEach(l => {
      if (l.content === letter) exists += 1
      if (l.guessed.correct || l.guessed.existsAnywhere) matched += 1
    })

    return exists > matched ? true : false

    // word.split('').forEach(l => {
    //   let numberOfOccurences = 1
    //   let hasMatched = false

    //   while (!hasMatched) {
    //     const reg = makeRegex(l, numberOfOccurences)

    //     if (!reg.test(word)) {
    //       numberOfOccurences += 1
    //     } else {
    //       hasMatched = true

    //       // setAmount({ ...amount, { exists: }})
    //     }
    //   }
    // })

    // function makeRegex(l: string, occurences: number) {
    //   let regex = '/'

    //   for (let i = 0; i <= occurences; i++) {
    //     regex += `[^${l}]*${l}`
    //   }

    //   return new RegExp(`${regex}[^${l}]*/`)
    // }
  }
}