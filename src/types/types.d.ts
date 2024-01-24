export type DefSet = {
  maxSize: number
  minSize: number
  word: string[] | string
  wordList: Token[][]
  curRow: number
  status: Status
}

export type Token = {
  content: string
  showHint: boolean
  guessed: {
    existsAnywhere: boolean
    content: string
    correct: boolean
  }
}

type Status = 'won' | 'lost' | 'playing'

export type Action =
  | {
    type: 'set-min-size' | 'set-max-size'
    payload: number
  }
  | {
    type: 'set-word'
    payload: string[] | string
  }
  | {
    type: 'set-word-list'
    payload: Token[][]
  }
  | {
    type: 'set-cur_row'
    payload: number
  }
  | {
    type: 'set-status'
    payload: Status
  }