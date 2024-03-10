import './App.css'

import { useEffect, useReducer, useState } from 'react'

import { Game } from './types/types'
import { reducer } from './utils/reducer'
import { newGame } from './utils/newGame'

import Interaction from './interaction/interaction'
import FinalScreen from './final screen/final-screen'
import Board from './game board/game-board'
import Toast from './toast/toast'

export const DEFAULT_GAME: Game = {
	word: '',
	wordList: [],
	curRow: 0,
	status: 'playing',
	progress: 0,
	difficulty: 'easy',
	timeTaken: 0,
	toast: {
		text: '',
		isWarning: false,
	},
	started: false,
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
			dispatch({ type: 'set-started', payload: false })
		}

		if (game.difficulty === 'hard' || game.difficulty === 'extreme') {
			if (game.timeTaken >= 600) {
				clearInterval(intervalId)
				dispatch({ type: 'set-status', payload: 'lost' })
			} else if (game.timeTaken === 540) {
				dispatch({ type: 'set-toast', payload: { isWarning: true, text: '1 minute remaining.' } })
			} else if (game.timeTaken === 300) {
				dispatch({ type: 'set-toast', payload: { isWarning: true, text: '5 minutes remaining.' } })
			}
		}
	}, [game.timeTaken, game.status])

	useEffect(() => {
		if (game.started) {
			const interval = setInterval(() => {
				dispatch({ type: 'set-time', payload: (game.timeTaken += 1) })
			}, 1000)
			setIntervalId(interval)

			return () => clearInterval(interval)
		}
	}, [game.started])

	useEffect(() => {
		const toastId = document.getElementById('toast-text')
		toastId?.addEventListener('animationend', handleAnimation)
		function handleAnimation() {
			dispatch({ type: 'set-toast', payload: { text: '' } })
		}

		return () => toastId?.removeEventListener('animationend', handleAnimation)
	}, [game.toast])

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
				<Toast {...game.toast} />
				<Interaction
					game={game}
					dispatch={dispatch}
					showHints={showHints}
					setShowHints={setShowHints}
					showAlphabet={showAlphabet}
					setShowAlphabet={setShowAlphabet}
					indicate={indicate}
				/>
			</div>
		</div>
	)
}

export default App
