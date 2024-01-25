// import { useEffect, useState } from 'react'
import { Action, DefSet } from '../types/types'
import s from './user-input.module.scss'
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
			<div className={s.btns}>
				<div>
					<button onClick={() => generateWord(user, dispatch)}>
						Generate New Word
					</button>
				</div>
				<div>
					<button
						onClick={() =>
							confirm(
								'Are you sure you want to reveal the word? This will reset all progress and generate a new word.'
							) && alert(`The word was '${user.word}'`)
						}>
						Reveal Word
					</button>
				</div>
			</div>
		</>
	)
}
