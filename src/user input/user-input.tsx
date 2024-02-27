import { useEffect } from 'react'
import { Action, DefSet, Difficulty } from '../types/types'
import ButtonBar from '../utils/components/ButtonBar'
import { newGame } from '../utils/newGame'
import { shorten } from '../utils/shorten'

export default function UserInput({
	user,
	dispatch,
}: {
	user: DefSet
	dispatch: React.Dispatch<Action>
}) {
	useEffect(() => {
		newGame(dispatch, user)
	}, [user.difficulty])

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
						defaultValue={user.difficulty}>
						{difficulties.map((d) => (
							<option
								key={d}
								value={d.toLowerCase()}>
								{d}
							</option>
						))}
					</select>
				</div>
				<div>
					<button
						disabled
						onClick={() =>
							confirm(
								'Are you sure you want to reveal the word? This will reset all progress and generate a new word.'
							) && alert(`The word was '${user.word}'`)
						}>
						{user.word}
					</button>
				</div>
				<div>
					<p>
						Progress:{' '}
						<span
							style={{
								color:
									user.progress >= 90
										? '#00ff0080'
										: user.progress >= 50
										? '#00ff0030'
										: 'var(--secondary)',
							}}>
							{shorten(user.progress)}%
						</span>
					</p>
				</div>
				<div>
					<p>Time: {user.timeTaken}</p>
				</div>
			</ButtonBar>
		</>
	)
}
