import { WordList } from "../types/types";

export function findFirst(list: WordList[][], e: KeyboardEvent) {
  const newArr = [...list]
  const key = e.key.toUpperCase()

  console.log(key)

  return newArr
}