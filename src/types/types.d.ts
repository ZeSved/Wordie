export type DefSet = {
  word: string[] | string
  wordList: Token[][]
  curRow: number
  status: Status
  progress: number
  difficulty: Difficulty
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
type Difficulty = 'easy' | 'medium' | 'hard' | 'extreme'

export type Action =
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
  | {
    type: 'set-progress'
    payload: number
  }
  | {
    type: 'set-progress'
    payload: number
  }
  | {
    type: 'set-difficulty'
    payload: Difficulty
  }