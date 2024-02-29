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

	function handleDifficulty(currentTarget: HTMLSelectElement) {
		const diff = currentTarget.value as Difficulty

		dispatch({ type: 'set-time', payload: 0 })
		dispatch({ type: 'set-difficulty', payload: diff })
	}

	const difficulties = ['Easy', 'Medium', 'Hard', 'Extreme']

	return (
		<div className={s.input}>
			<div>
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
			</div>
			{devMode && (
				<div>
					<button disabled>{game.word}</button>
				</div>
			)}
			<div>
				<button onClick={() => setShowHints(!showHints)}>Show Hints</button>
			</div>
			<div>
				<p>
					Progress:{' '}
					<span
						style={{
							color:
								game.progress >= 90
									? '#00ff0080'
									: game.progress >= 50
									? '#00ff0030'
									: 'var(--secondary)',
						}}>
						{shorten(game.progress)}%
					</span>
				</p>
			</div>
			<div>
				<p>Time: {game.timeTaken}</p>
			</div>
		</div>
	)
}
