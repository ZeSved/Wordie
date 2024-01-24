import './App.css'

import { useEffect, useReducer } from 'react'

import Board from './board/board'
import { DefSet } from './types/types'
import UserInput from './user-input/user-input'
import { createContent } from './utils/createContent'
import { reducer } from './utils/reducer'
import FinalScreen from './final-screen/finalScreen'

import { generate } from 'random-words'

export const DEFAULT_SETTINGS: DefSet = {
	maxSize: 7,
	minSize: 4,
	word: '',
	wordList: [],
	curRow: 0,
	status: 'playing',
}

export const WORD_KEY = 'word'
export const WORDLIST_KEY = 'word_list'

function App() {
	const [user, dispatch] = useReducer(reducer, DEFAULT_SETTINGS)

	useEffect(() => {
		const word = generate({
			maxLength: user.maxSize ?? user.minSize + 1,
			minLength: user.minSize ?? user.maxSize - 1,
		})
		// const word = 'house'

		dispatch({
			type: 'set-word',
			payload: window.localStorage.getItem(WORD_KEY) ?? word,
		})

		dispatch({
			type: 'set-word-list',
			payload: JSON.parse(
				window.localStorage.getItem(WORDLIST_KEY) ?? JSON.stringify(createContent(word))
			),
		})
	}, [])

	return (
		<div className='wrapper'>
			<div className='main'>
				{user.status !== 'playing' && (
					<FinalScreen
						user={user}
						dispatch={dispatch}
					/>
				)}
				<Board
					user={user}
					dispatch={dispatch}
				/>
				<UserInput
					user={user}
					dispatch={dispatch}
				/>
			</div>
		</div>
	)
}

export default App
