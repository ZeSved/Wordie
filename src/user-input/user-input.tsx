import { DefSet } from '../App'
import { getWord } from '../utils/getWord'
import s from './user-input.module.scss'

export default function UserInput({
	user,
	setUser,
}: {
	user: DefSet
	setUser: React.Dispatch<React.SetStateAction<DefSet>>
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
							setUser({
								maxSize: user.maxSize,
								minSize: parseInt(e.currentTarget.value),
								word: user.word,
								wordList: user.wordList,
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
							setUser({
								maxSize: parseInt(e.currentTarget.value),
								minSize: user.minSize,
								word: user.word,
								wordList: user.wordList,
							})
						}}
						name=''
						id={`${user.maxSize}`}
					/>
				</div>
				<button
					onClick={() =>
						setUser({ maxSize: 7, minSize: 4, word: user.word, wordList: user.wordList })
					}>
					Reset Settings
				</button>
				<button onClick={() => getWord(user, setUser)}>Regenerate Word</button>
			</div>
		</>
	)
}
