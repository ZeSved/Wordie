import { useEffect } from 'react'
import { Action, Game, Difficulty } from '../types/types'
import ButtonBar from '../utils/components/ButtonBar'
import { newGame } from '../utils/newGame'
import { shorten } from '../utils/shorten'

export default function gameInput({
	game,
	dispatch,
}: {
	game: Game
	dispatch: React.Dispatch<Action>
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
		<>
			<ButtonBar>
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
			</ButtonBar>
		</>
	)
}
