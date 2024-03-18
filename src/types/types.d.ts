export type Game = {
  word: string
  wordList: Token[][]
  curRow: number
  status: Status
  progress: number
  difficulty: Difficulty
  timeTaken: number
  toast: Toast
  started: boolean
  language: Language
}

export type Token = {
  content: string
  guessed: {
    existsAnywhere: boolean
    content: string
    correct: boolean
  }
}

export type Toast = {
  text: string
  isWarning?: boolean
}

type Status = 'won' | 'lost' | 'playing'
type Difficulty = 'easy' | 'medium' | 'hard' | 'extreme'
type Language = 'english' | 'swedish'

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
  | {
    type: 'set-toast'
    payload: Toast
  }
  | {
    type: 'set-started'
    payload: boolean
  }
  | {
    type: 'set-language'
    payload: Language
  }