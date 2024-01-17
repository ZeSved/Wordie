import { Action, DefSet } from '../types/types'
import { getWord } from '../utils/getWord'
import s from './user-input.module.scss'

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
				<div>
					<button
						onClick={() =>
							dispatch({
								type: 'set-word-list',
								payload: getWord(user, dispatch),
							})
						}>
						Regenerate Word
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
