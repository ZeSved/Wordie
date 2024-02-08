import { useEffect } from 'react'
import { Action, DefSet, Difficulty } from '../types/types'
import ButtonBar from '../utils/components/ButtonBar'
import { generateWord } from '../utils/generateWord'

export default function UserInput({
	user,
	dispatch,
}: {
	user: DefSet
	dispatch: React.Dispatch<Action>
}) {
	useEffect(() => {
		generateWord(dispatch, user.difficulty)
	}, [user.difficulty])

	function handleDifficulty(currentTarget: HTMLSelectElement) {
		const diff = currentTarget.value as Difficulty

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
						{user.progress.toString().length > 3
							? user.progress.toString().substring(0, 4)
							: user.progress}
						%
					</p>
				</div>
				{/* <div>
					<p>Time: ...</p>
				</div> */}
			</ButtonBar>
		</>
	)
}
