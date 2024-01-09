export type DefSet = {
  maxSize: number
  minSize: number
  word: string
  wordList: WordList[][]
}

export type WordList = {
  content: string
  guessed: {
    content: string
    correct: boolean
  }
}