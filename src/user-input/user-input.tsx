import { useEffect, useState } from 'react'
import { Action, DefSet } from '../types/types'
import s from './user-input.module.scss'
import { WORDLIST_KEY, WORD_KEY } from '../App'

export default function UserInput({
	user,
	dispatch,
}: {
	user: DefSet
	dispatch: React.Dispatch<Action>
}) {
	const [saveProgress, setSaveProgress] = useState(false)

	useEffect(() => {
		if (saveProgress) {
			window.localStorage.setItem(WORD_KEY, JSON.stringify(user.word))
			window.localStorage.setItem(WORDLIST_KEY, JSON.stringify(user.wordList))
		} else {
			window.localStorage.removeItem(WORD_KEY)
			window.localStorage.removeItem(WORDLIST_KEY)
		}
	}, [saveProgress, user])

	return (
		<>
			<div className={s.btns}>
				<div>
					<label htmlFor={`${user.minSize}`}>Minimum Word Length</label>
					<input
						placeholder={`${user.minSize}`}
						type='number'
						onChange={(e) => {
							dispatch({
								type: 'set-min-size',
								payload: parseInt(e.currentTarget.value),
							})
						}}
						name=''
						id={`${user.minSize}`}
					/>
				</div>
				<div>
					<label htmlFor={`${user.maxSize}`}>Maximum Word Length</label>
					<input
						placeholder={`${user.maxSize}`}
						type='number'
						onChange={(e) => {
							dispatch({
								type: 'set-max-size',
								payload: parseInt(e.currentTarget.value),
							})
						}}
						name=''
						id={`${user.maxSize}`}
					/>
				</div>
				<div>
					<button
						onClick={() => {
							dispatch({ type: 'set-max-size', payload: 7 })
							dispatch({ type: 'set-min-size', payload: 4 })
						}}>
						Reset Settings
					</button>
				</div>
				<div className={saveProgress ? '' : s.nosave}>
					<button onClick={() => setSaveProgress(!saveProgress)}>Save Progress</button>
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
