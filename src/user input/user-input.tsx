import { useEffect } from 'react'
import { Action, Game, Difficulty } from '../types/types'
import { newGame } from '../utils/newGame'
import { shorten } from '../utils/shorten'
import s from './user-input.module.scss'

export default function gameInput({
	game,
	dispatch,
	showHints,
	setShowHints,
}: {
	game: Game
	dispatch: React.Dispatch<Action>
	showHints: boolean
	setShowHints: React.Dispatch<React.SetStateAction<boolean>>
}) {
	useEffect(() => {
		newGame(dispatch, game)
	}, [game.difficulty])

	const devMode = window.location.origin === 'http://localhost:5173'
	const difficulties = ['Easy', 'Medium', 'Hard', 'Extreme']

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
