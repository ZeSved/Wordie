export type DefSet = {
  maxSize: number
  minSize: number
  word: string
  wordList: Token[][]
  curRow: number
}

export type Token = {
  content: string
  guessed: {
    existsAnywhere: boolean
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
    payload: Token[][]
  }
  | {
    type: 'set-cur_row'
    payload: number
  }