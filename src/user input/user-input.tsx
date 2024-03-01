import { useEffect } from 'react'
import { Action, Game, Difficulty } from '../types/types'
import { newGame } from '../utils/newGame'
import { shorten } from '../utils/shorten'
import s from './user-input.module.scss'
import { Indicate } from '../App'

export default function gameInput({
	game,
	dispatch,
	showHints,
	setShowHints,
	indicate,
}: {
	game: Game
	dispatch: React.Dispatch<Action>
	showHints: boolean
	setShowHints: React.Dispatch<React.SetStateAction<boolean>>
	indicate: Indicate
}) {
	useEffect(() => {
		newGame(dispatch, game)
	}, [game.difficulty])

	const devMode = window.location.origin === 'http://localhost:5173'
	const difficulties = ['Easy', 'Medium', 'Hard', 'Extreme']
	const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

	function handleDifficulty(currentTarget: HTMLSelectElement) {
		const diff = currentTarget.value as Difficulty

		dispatch({ type: 'set-time', payload: 0 })
		dispatch({ type: 'set-difficulty', payload: diff })
	}

	function colorIndication(color: string, maxValue: number, dependancy: number) {
		const percentage = maxValue / 10

		if (dependancy >= percentage * 9) {
			return `${color}80`
		} else if (dependancy >= percentage * 5) {
			return `${color}30`
		} else {
			return 'var(--secondary)'
		}
	}

	return (
		<div className={s.input}>
			<select
				onChange={(e) => handleDifficulty(e.currentTarget)}
				defaultValue={game.difficulty}>
				{difficulties.map((d) => (
					<option
						key={d}
						value={d.toLowerCase()}>
						{d}
					</option>
				))}
			</select>
			{devMode && <p>{game.word}</p>}
			<button
				className={showHints ? s.active : s.unactive}
				onClick={() => setShowHints(!showHints)}>
				{showHints ? 'Hide Hints' : 'Show Hints'}
			</button>
			<div className={s.indicator}>
				{letters.map((letter) => (
					<p
						style={{
							color: indicate.correct.includes(letter)
								? '#00ff00'
								: indicate.inWord.includes(letter)
								? '#eeff00'
								: indicate.notInWord.includes(letter)
								? '#ffffff30'
								: 'var(--secondary)',
						}}
						key={letter}>
						{letter}
					</p>
				))}
			</div>
			<div>
				<div className={s.container}>
					<p>Progress: </p>
					<p
						style={{
							color: colorIndication('#00ff00', 100, game.progress),
						}}>
						{shorten(game.progress)}%
					</p>
				</div>
				<div className={s.container}>
					<p>Time:</p>
					<p
						style={{
							color:
								game.difficulty === 'extreme'
									? colorIndication('#ff0000', 600, game.timeTaken)
									: 'var(--secondary)',
						}}>
						{game.timeTaken}
					</p>
				</div>
			</div>
		</div>
	)
}
