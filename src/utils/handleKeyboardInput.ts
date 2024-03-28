import { Action, Game, Token } from "../types/types"
import { Indicate, allTimeStats } from "../App"
import { ProgressOnRow } from "../game board/game-board"
import { words as list } from "../constants/words"

const ALLOWED_LETTERS = /^[a-zA-Z]$/

export function handleKeyboardInput(
  key: string,

  game: Game,
  progress: number[],
  progressOnRow: ProgressOnRow,
  indicate: Indicate,
  guessedWord: string[],

  dispatch: React.Dispatch<Action>,
  setProgress: React.Dispatch<React.SetStateAction<number[]>>,
  setProgressOnRow: React.Dispatch<React.SetStateAction<ProgressOnRow>>,
  setIndicate: React.Dispatch<React.SetStateAction<Indicate>>,
  setGuessedWord: React.Dispatch<React.SetStateAction<string[]>>
) {
  const index = helper.findFirstInRow(game)
  const curRowArr = game.wordList[game.curRow]
  const allTime = JSON.parse(window.localStorage.getItem('allTimeStats') ?? JSON.stringify(allTimeStats))
  const Lkey = key.toLowerCase()
  const { correct, exists }: ProgressOnRow = progressOnRow
  const { correct: c, notInWord: nIW, inWord: iW }: Indicate = indicate

  if (!game.started && game.timeTaken > 0) return

  // If any alphabetic key was pressed
  if (ALLOWED_LETTERS.test(key)) {
    if (index === -1) return
    const { guessed: guess, content }: Token = curRowArr[index]

    if (game.curRow === 0 && index === 0 && !game.started) {
      dispatch({ type: 'set-started', payload: true })
      dispatch({ type: 'set-time', payload: game.timeTaken += 1 })
    }

    guess.content = key.toUpperCase()
    guess.correct = content === guess.content

    setGuessedWord([...guessedWord, guess.content])

    if (guess.correct) {
      correct.push(Lkey)

      if (exists.includes(Lkey) && helper.remaining(game, progressOnRow, Lkey).full) {
        exists.splice(exists.indexOf(Lkey), 1)
      }
    }

    if (helper.remaining(game, progressOnRow, Lkey).remaining && !helper.remaining(game, progressOnRow, Lkey).full) {
      if (!guess.correct && game.word.includes(Lkey)) exists.push(Lkey)
    }

    if (!progress.includes(index) && guess.correct) { setProgress([...progress, index]) }
    setProgressOnRow({ correct, exists })

    return helper.updateWordList(game.wordList, dispatch)
  }

  // If the Backspace key was pressed
  if (key === 'Backspace') {
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

    guessedWord.splice(guessedWord.length - 1, 1)
    setGuessedWord(guessedWord)
    return helper.updateWordList(game.wordList, dispatch)
  }

  // If the Enter key was pressed
  if (key === 'Enter') {
    if (index !== -1) return
    if (!list.english[`letters_${game.word.length}` as keyof typeof list.english].includes(guessedWord.join('').toLowerCase())) return

    const lastRow = helper.checkCurrentRow(game)
    const gameWon = lastRow ? true : game.curRow === 5 ? false : undefined

    dispatch({ type: "set-progress", payload: (100 / game.word.length) * progress.length })

    exists.forEach(x => {
      const i = game.wordList[game.curRow].findIndex(t => t.guessed.content.toLowerCase() === x)
      if (i !== -1) { game.wordList[game.curRow][i].guessed.existsAnywhere = true }
    })

    curRowArr.forEach(k => {
      if (!c.includes(k.guessed.content) && k.guessed.correct) {
        c.push(k.guessed.content.toUpperCase())
      }

      if (!iW.includes(k.guessed.content) && k.guessed.existsAnywhere) {
        iW.push(k.guessed.content.toUpperCase())
      }

      if (!nIW.includes(k.guessed.content) && !game.word.includes(k.guessed.content)) {
        nIW.push(k.guessed.content.toUpperCase())
      }
    })

    setIndicate({ correct: c, notInWord: nIW, inWord: iW })
    helper.updateWordList(game.wordList, dispatch)

    if (gameWon !== undefined) {
      dispatch({ type: "set-status", payload: gameWon ? "won" : "lost" })

      allTime.games.played += 1
      if (gameWon) {
        allTime.games.won += 1
      }
      allTime.averageCorrectPerSecond = game.timeTaken === 0 ? game.word.length : game.word.length / game.timeTaken

      window.localStorage.setItem('allTimeStats', JSON.stringify(allTime))
    }

    setProgressOnRow({ correct: [], exists: [] })
    setGuessedWord([])
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