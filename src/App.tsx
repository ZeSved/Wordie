import './App.css'

import { useEffect, useReducer } from 'react'

import Board from './board/board'
import { DefSet } from './types/types'
import UserInput from './user-input/user-input'
// import { createContent } from './utils/createContent'
import { reducer } from './utils/reducer'
import FinalScreen from './final-screen/finalScreen'

// import { generate } from 'random-words'
import { generateWord } from './utils/generateWord'

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
		generateWord(user, dispatch)
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
