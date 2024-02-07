import './App.css'

import { useEffect, useReducer } from 'react'

import { DefSet } from './types/types'
import { reducer } from './utils/reducer'
import { generateWord } from './utils/generateWord'

import UserInput from './user-input/UserInput'
import FinalScreen from './final-screen/FinalScreen'
import Board from './board/Board'

export const DEFAULT_SETTINGS: DefSet = {
	word: '',
	wordList: [],
	curRow: 0,
	status: 'playing',
	progress: 0,
	difficulty: 'medium',
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
