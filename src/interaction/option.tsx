import { Action, Difficulty } from '../types/types'
import { capitalize } from '../utils/modify'
import { useEffect, useState } from 'react'
import s from './interaction.module.scss'
import SVG from './Reload_SVG'
import classNames from 'classnames'

export default function Option({ btns, dispatch }: OptionProps) {
	const [show, setShow] = useState<boolean>(false)

	useEffect(() => {
		if (!show) {
			document.getElementById(btns.text)?.blur()
		}
	}, [show])

	function handleSelectEvents(currentTarget: HTMLSelectElement) {
		const newOption = currentTarget.value as Difficulty
		dispatch({ type: 'set-difficulty', payload: newOption })
		dispatch({
			type: 'set-toast',
			payload: { text: `Difficulty changed to ${newOption} and board reset.` },
		})

		dispatch({ type: 'set-time', payload: 0 })
		dispatch({ type: 'set-started', payload: false })
	}

	return btns.inputType === 'select' ? (
		<>
			<select
				onChange={(e) => handleSelectEvents(e.currentTarget)}
				id={btns.text}
				defaultValue={btns.defaultValue}>
				{btns.content.map((d) => (
					<option
						key={d}
						value={d.toLowerCase()}>
						{capitalize(d)}
					</option>
				))}
			</select>
		</>
	) : (
		<>
			<button
				onMouseEnter={() => setShow(true)}
				onMouseLeave={() => setShow(false)}
				onClick={
					btns.func
						? btns.func
						: () => {
								btns.setValue!(!btns.value)
								dispatch({
									type: 'set-toast',
									payload: {
										text: `${
											btns.text === 'word' ? 'Regenerating' : btns.value ? 'Hiding' : 'Showing'
										} ${btns.text}.`,
									},
								})
						  }
				}
				id={btns.text}
				disabled={!btns.canEnable}>
				{btns.hasSvg ? (
					<SVG color='var(--secondary)' />
				) : btns.displayText ? (
					<p className={classNames(!show ? s.show : s.hide, btns.value ? s.on : s.off)}>
						{btns.displayText}
					</p>
				) : (
					<img
						src={btns.imgSrc}
						alt={btns.text}
					/>
				)}
				<div
					style={{
						width: show ? `calc(var(--gap-1) * ${btns.text.length / 1.3})` : 0,
						right: `calc(var(--gap-1) * -${btns.text.length / 5})`,
					}}
					className={classNames(show ? s.show : s.hide, btns.value ? s.on : s.off)}>
					<p>{btns.text}</p>
				</div>
			</button>
		</>
	)
}

type OptionProps = {
	btns: InputBtn
	dispatch: React.Dispatch<Action>
}

export type InputBtn = {
	text: string
	canEnable?: boolean
	imgSrc?: string
	displayText?: string
	hasSvg?: boolean
} & (
	| {
			inputType: 'select'
			content: string[]
			defaultValue: string
	  }
	| {
			inputType: 'button'
			setValue?: React.Dispatch<React.SetStateAction<boolean>>
			value?: boolean
			func?: () => void
	  }
)
