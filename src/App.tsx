import './App.css'

import { useEffect, useReducer } from 'react'

import { DefSet } from './types/types'
import { reducer } from './utils/reducer'
import { generateWord } from './utils/generateWord'

import UserInput from './user input/user-input'
import FinalScreen from './final screen/final-screen'
import Board from './game board/game-board'

export const DEFAULT_SETTINGS: DefSet = {
	word: '',
	wordList: [],
	curRow: 0,
	status: 'playing',
	progress: 0,
	difficulty: 'easy',
}

export const WORD_KEY = 'word'
export const WORDLIST_KEY = 'word_list'

function App() {
	const [user, dispatch] = useReducer(reducer, DEFAULT_SETTINGS)

	useEffect(() => {
		generateWord(dispatch, user.difficulty)
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
