import { generate } from 'random-words'
import { DefSet } from '../App'
import s from './user-input.module.scss'
import { ChangeEvent } from 'react'

export default function UserInput({
	userSettings,
	setUserSettings,
}: {
	userSettings: DefSet
	setUserSettings: React.Dispatch<React.SetStateAction<DefSet>>
}) {
	function handleInput(e: ChangeEvent<HTMLInputElement>, val: number) {
		if (parseInt(e.target.value) === 0) return
		else setUserSettings({ maxSize: val, minSize: parseInt(e.target.value) })
	}

	return (
		<>
			<div className={s.btns}>
				<div>
					<label htmlFor={`${userSettings.minSize}`}>Minimum Word Length</label>
					<input
						placeholder={`${userSettings.minSize}`}
						type='number'
						onChange={(e) => handleInput(e, userSettings.maxSize)}
						name=''
						id={`${userSettings.minSize}`}
					/>
				</div>
				<div>
					<label htmlFor={`${userSettings.maxSize}`}>Maximum Word Length</label>
					<input
						placeholder={`${userSettings.maxSize}`}
						type='number'
						onChange={(e) => handleInput(e, userSettings.minSize)}
						name=''
						id={`${userSettings.maxSize}`}
					/>
				</div>
				<button
					onClick={() =>
						console.log(
							generate({ minLength: userSettings.minSize, maxLength: userSettings.maxSize })
						)
					}>
					Reset Settings
				</button>
			</div>
		</>
	)
}
