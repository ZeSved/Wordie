// import { useEffect, useState } from 'react'
import { Action, DefSet } from '../types/types'
import ButtonBar from '../utils/components/ButtonBar'
import { generateWord } from '../utils/generateWord'

export default function UserInput({
	user,
	dispatch,
}: {
	user: DefSet
	dispatch: React.Dispatch<Action>
}) {
	return (
		<>
			<ButtonBar>
				<div>
					<button
						disabled
						onClick={() => generateWord(dispatch, user.difficulty)}>
						Generate New Word
					</button>
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
					<p>Progress: {user.progress}%</p>
				</div>
			</ButtonBar>
		</>
	)
}
