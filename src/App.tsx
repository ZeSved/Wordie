import './App.css'

import { useEffect, useReducer, useState } from 'react'

import { Game } from './types/types'
import { reducer } from './utils/reducer'
import { newGame } from './utils/newGame'

import UserInput from './user input/user-input'
import FinalScreen from './final screen/final-screen'
import Board from './game board/game-board'
import Alphabet from './progress/alphabet'

export const DEFAULT_GAME: Game = {
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
	averageCorrectPerSecond: 0,
}

export type Indicate = {
	correct: string[]
	inWord: string[]
	notInWord: string[]
}

function App() {
	const [game, dispatch] = useReducer(reducer, DEFAULT_GAME)
	const [intervalId, setIntervalId] = useState<number>(0)
	const [showHints, setShowHints] = useState<boolean>(true)
	const [showAlphabet, setShowAlphabet] = useState<boolean>(true)
	const [indicate, setIndicate] = useState<Indicate>({
		correct: [],
		inWord: [],
		notInWord: [],
	})

	useEffect(() => {
		newGame(dispatch, game)
	}, [])

	useEffect(() => {
		if (game.status !== 'playing') {
			clearInterval(intervalId)
			setIndicate({ correct: [], notInWord: [], inWord: [] })
		}

		if ((game.difficulty === 'hard' || game.difficulty === 'extreme') && game.timeTaken >= 600) {
			clearInterval(intervalId)
			dispatch({ type: 'set-status', payload: 'lost' })
		}
	}, [game.timeTaken, game.status])

	useEffect(() => {
		const interval = setInterval(() => {
			dispatch({ type: 'set-time', payload: (game.timeTaken += 1) })
		}, 1000)

		setIntervalId(interval)

		return () => clearInterval(interval)
	}, [game.word])

	return (
		<div className='wrapper'>
			<div className='main'>
				{game.status !== 'playing' && (
					<FinalScreen
						game={game}
						dispatch={dispatch}
					/>
				)}
				<Board
					game={game}
					dispatch={dispatch}
					showHints={showHints}
					indicate={indicate}
					setIndicate={setIndicate}
				/>
				<Alphabet indicate={indicate} />
				<UserInput
					game={game}
					dispatch={dispatch}
					showHints={showHints}
					setShowHints={setShowHints}
					showAlphabet={showAlphabet}
					setShowAlphabet={setShowAlphabet}
				/>
			</div>
		</div>
	)
}

export default App
