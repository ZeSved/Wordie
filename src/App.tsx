import './App.css'

import { useEffect, useReducer, useState } from 'react'

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
	timeTaken: 0,
}

export const allTimeStats = {
	games: {
		played: 0,
		won: 0,
	},
}

function App() {
	const [user, dispatch] = useReducer(reducer, DEFAULT_SETTINGS)
	const [intervalId, setIntervalId] = useState<number>()

	useEffect(() => {
		generateWord(dispatch, user.difficulty)

		const interval = setInterval(() => {
			dispatch({ type: 'set-time', payload: (user.timeTaken += 1) })
		}, 1000)

		setIntervalId(interval)

		return () => clearInterval(interval)
	}, [])

	useEffect(() => {
		if (user.status !== 'playing') {
			clearInterval(intervalId)
		}

		if ((user.difficulty === 'hard' || user.difficulty === 'extreme') && user.timeTaken >= 600) {
			clearInterval(intervalId)
			dispatch({ type: 'set-status', payload: 'lost' })
		}
	}, [user.timeTaken, user.status])

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
