import { Action, Game, Token } from "../types/types"
import { allTimeStats } from "../App"
import { ProgressOnRow } from "../game board/game-board"

const ALLOWED_LETTERS = /^[a-zA-Z]$/

export function handleKeyboardInput(
  e: KeyboardEvent,
  game: Game,
  dispatch: React.Dispatch<Action>,
  progress: number[],
  setProgress: React.Dispatch<React.SetStateAction<number[]>>,
  progressOnRow: ProgressOnRow,
  setProgressOnRow: React.Dispatch<React.SetStateAction<ProgressOnRow>>,
) {
  const index = helper.findFirstInRow(game)
  const curRowArr = game.wordList[game.curRow]
  const allTime = JSON.parse(window.localStorage.getItem('allTimeStats') ?? JSON.stringify(allTimeStats))
  const key = e.key.toLowerCase()
  const { correct, exists }: ProgressOnRow = progressOnRow

  // If any alphabetic key was pressed
  if (ALLOWED_LETTERS.test(e.key)) {
    if (index === -1) return
    const { guessed: guess, content }: Token = curRowArr[index]

    guess.content = e.key.toUpperCase()
    guess.correct = content === guess.content

    if (guess.correct) {
      correct.push(key)

      if (exists.includes(key) && helper.remaining(game, progressOnRow, key).full) {
        exists.splice(exists.indexOf(key), 1)
      }
    }

    if (helper.remaining(game, progressOnRow, key).remaining && !helper.remaining(game, progressOnRow, key).full) {
      if (!guess.correct && game.word.includes(key)) exists.push(key)
    }

    if (!progress.includes(index) && guess.correct) { setProgress([...progress, index]) }
    setProgressOnRow({ correct, exists })
    console.log(exists)

    return helper.updateWordList(game.wordList, dispatch)
  }

  // If the Backspace key was pressed
  if (e.key === 'Backspace') {
    if (index === 0) return

    const prevLetterIndex = (index === -1 ? game.word.length : index) - 1
    const prevLetCurRow = curRowArr[prevLetterIndex]

    const progressIncludes = progress.includes(prevLetterIndex)
    const correctIncludes = correct.includes(prevLetCurRow.content.toLowerCase())
    const existsIncludes = exists.includes(prevLetCurRow.content.toLowerCase())
    const includedInProgress = (correctIncludes || existsIncludes || progressIncludes)

    if ((!prevLetCurRow.guessed.correct && existsIncludes && game.curRow > 0)) {
      progressOnRow.exists.splice(progressOnRow.exists.indexOf(prevLetCurRow.content), 1)
    }

    if (includedInProgress && (game.curRow === 0 || (canRemove() && game.curRow > 0))) updateProgress()

    function updateProgress() {
      progressIncludes && progress.splice(progress.indexOf(prevLetterIndex), 1)
      correctIncludes && progressOnRow.correct.splice(progressOnRow.correct.indexOf(prevLetCurRow.content), 1)
      existsIncludes && progressOnRow.exists.splice(progressOnRow.exists.indexOf(prevLetCurRow.content), 1)
    }

    function canRemove() {
      for (let i = 0; i < game.curRow; i++) {
        if (!game.wordList[i][prevLetterIndex].guessed.correct) continue
        else return false
      }

      return true
    }

    prevLetCurRow.guessed.content = ''
    setProgress(progress)
    setProgressOnRow(progressOnRow)
    return helper.updateWordList(game.wordList, dispatch)
  }

  // If the Enter key was pressed
  if (e.key === 'Enter') {
    if (index !== -1) return
    const lastRow = helper.checkCurrentRow(game)
    const gameWon = lastRow ? true : game.curRow === 5 ? false : undefined

    dispatch({ type: "set-progress", payload: (100 / game.word.length) * progress.length })

    // game.word.split('').forEach(l => {
    //   if (helper.remaining(game, progressOnRow, l).full && exists.includes(l)) {
    //     const newArr = exists
    //     while (newArr.includes(l)) {
    //       game.wordList[game.curRow][curRowArr.findIndex(x => x.guessed.content === l)].guessed.existsAnywhere = false
    //       newArr.splice(exists.indexOf(l), 1)
    //     }
    //   }
    // })

    // game.wordList[game.curRow].forEach(obj => {
    //   if (helper.remaining(game, progressOnRow, obj.guessed.content).full) {
    //     obj.guessed.existsAnywhere = false
    //   }
    // })
    exists.forEach(x => {
      const i = game.wordList[game.curRow].findIndex(t => t.guessed.content.toLowerCase() === x)
      if (i !== -1) { game.wordList[game.curRow][i].guessed.existsAnywhere = true }
    })

    helper.updateWordList(game.wordList, dispatch)

    if (gameWon !== undefined) {
      dispatch({ type: "set-status", payload: gameWon ? "won" : "lost" })

      allTime.games.played += 1
      if (gameWon) {
        allTime.games.won += 1
      }
      allTime.averageCorrectPerSecond = game.word.length / game.timeTaken

      window.localStorage.setItem('allTimeStats', JSON.stringify(allTime))
    }

    setProgressOnRow({ correct: [], exists: [] })
    return dispatch({ type: "set-cur_row", payload: game.curRow + 1 })
  }
}

class helper {
  static updateWordList(wordList: Token[][] | undefined, dispatch: React.Dispatch<Action>) {
    wordList && dispatch({ type: 'set-word-list', payload: wordList })
  }

  static remaining(game: Game, progressOnRow: ProgressOnRow, key: string) {
    const occurencesInWord = game.word.split('').filter((x) => x === key).length
    const occurencesInRow = progressOnRow.correct.filter((x) => x === key).length

    return {
      remaining: occurencesInWord > occurencesInRow + progressOnRow.exists.filter((x) => x === key).length,
      full: occurencesInWord === occurencesInRow
    }
  }

  static findFirstInRow(u: Game) {
    if (u.wordList.length > 0) {
      return u.wordList[u.curRow].findIndex(e => e.guessed.content.length <= 0)
    } else {
      return 0
    }
  }

  static checkCurrentRow(u: Game) {
    for (let i = 0; i < u.wordList[u.curRow].length; i++) {
      if (u.wordList[u.curRow][i].guessed.correct) continue
      else return false
    }

    return true
  }
}