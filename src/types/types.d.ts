export type DefSet = {
  word: string
  wordList: Token[][]
  curRow: number
  status: Status
  progress: number
  difficulty: Difficulty
  timeTaken: number
}

export type Token = {
  content: string
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
    payload: string
  }
  | {
    type: 'set-word-list'
    payload: Token[][]
  }
  | {
    type: 'set-cur_row' | 'set-progress' | 'set-time'
    payload: number
  }
  | {
    type: 'set-status'
    payload: Status
  }
  | {
    type: 'set-difficulty'
    payload: Difficulty
  }