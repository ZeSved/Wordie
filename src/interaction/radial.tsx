import classNames from 'classnames'
import s from './interaction.module.scss'
import { Action } from '../types/types'
import { capitalizeFirstLetter } from '../utils/modify'
import { useEffect } from 'react'

export default function Radial({ canEnable = true, text, setValue, value, dispatch }: RadialBtn) {
	useEffect(() => {
		document.getElementById(text)?.blur()
	}, [value])

	return (
		<>
			<div className='border' />
			<div className={s.radial}>
				<p>{`Show ${capitalizeFirstLetter(text)}`}</p>
				<button
					onClick={() => {
						setValue(!value)
						dispatch({
							type: 'set-toast',
							payload: { text: `${value ? 'Hiding' : 'Showing'} ${text}.` },
						})
					}}
					id={text}
					disabled={!canEnable}
					className={classNames(s.container, value ? s.active : s.unactive)}>
					<div className={s.circle} />
				</button>
			</div>
		</>
	)
}

export type RadialBtn = {
	text: string
	canEnable?: boolean
	setValue: React.Dispatch<React.SetStateAction<boolean>>
	value: boolean
	dispatch: React.Dispatch<Action>
}
