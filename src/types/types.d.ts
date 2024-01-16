export type DefSet = {
  maxSize: number
  minSize: number
  word: string
  wordList: WordList[][]
  curRow: number
}

export type WordList = {
  content: string
  guessed: {
    content: string
    correct: boolean
  }
}

export type Action =
  | {
    type: 'set-min-size' | 'set-max-size'
    payload: number
  }
  | {
    type: 'set-word'
    payload: string
  }
  | {
    type: 'set-word-list'
    payload: WordList[][]
  }
  | {
    type: 'set-cur_row'
    payload: number
  }