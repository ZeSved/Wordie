import { useEffect, useState } from 'react'
import { Action, Game } from '../types/types'
import { newGame } from '../utils/newGame'
import { shorten } from '../utils/modify'
import s from './interaction.module.scss'
import Option, { InputBtn } from './option'
import Alphabet from '../progress/alphabet'
import { Indicate } from '../App'

import globe from '../public/1200px-Globe_icon.png'

type Info = {
	text: string
	color?: string
	value: string | number
	onlyShow?: boolean
}

export default function Interaction({
	game,
	dispatch,
	showHints,
	setShowHints,
	indicate,
}: InteractionProps) {
	const [showAlphabet, setShowAlphabet] = useState<boolean>(true)

	useEffect(() => {
		newGame(dispatch, game)

		if (game.difficulty === 'extreme' || game.difficulty === 'hard') {
			setShowAlphabet(false)
			setShowHints(false)
		}

		document.getElementById('selectDiff')?.blur()
		document.getElementById('selectLang')?.blur()
	}, [game.difficulty, game.language])

	const hardMode = game.difficulty === 'extreme' || game.difficulty === 'hard'

	const difficulties = ['Easy', 'Medium', 'Hard', 'Extreme']
	const languages = ['english', 'swedish']
	const inputBtns: InputBtn[] = [
		{
			text: 'difficulty',
			inputType: 'select',
			displayText: game.difficulty,
			content: difficulties,
			defaultValue: game.difficulty,
		},
		{
			text: 'language',
			inputType: 'select',
			content: languages,
			imgSrc: globe,
			defaultValue: game.language,
		},
		{
			text: 'hints',
			canEnable: game.difficulty !== 'extreme',
			setValue: setShowHints,
			value: showHints,
			inputType: 'button',
			displayText: '?',
		},
		{
			text: 'alphabet',
			canEnable: !hardMode,
			setValue: setShowAlphabet,
			value: showAlphabet,
			inputType: 'button',
			displayText: 'ABC',
		},
		{
			text: 'word',
			func: () => {
				newGame(dispatch, game)
				dispatch({ type: 'set-toast', payload: { text: 'Generated new word and reset game.' } })
			},
			inputType: 'button',
			hasSvg: true,
			canEnable: true,
		},
	]

	const info: Info[] = [
		{
			text: 'Progress:',
			color: colorIndication('#00ff00', 100, game.progress),
			value: shorten(game.progress) + '%',
		},
		{
			text: 'Time:',
			color:
				game.difficulty === 'extreme'
					? colorIndication('#ff0000', 600, game.timeTaken)
					: 'var(--secondary)',
			value: game.timeTaken,
		},
	]

	const charachters = {
		english: [''],
		swedish: ['å', 'ä', 'ö'],
	}

	function colorIndication(color: string, maxValue: number, dependancy: number) {
		const percentage = maxValue / 10

		if (dependancy >= percentage * 9) {
			return `${color.replace(/00/g, '54')}95`
		} else if (dependancy >= percentage * 5) {
			return `${color.replace(/00/g, 'ab')}95`
		} else {
			return 'var(--secondary)'
		}
	}

	return (
		<div className={s.input}>
			<section>
				{inputBtns.map((b, i) => (
					<>
						<Option
							key={i}
							btns={{ ...b }}
							dispatch={dispatch}
						/>
						{i !== inputBtns.length - 1 && <div className='border' />}
					</>
				))}
				{game.language !== 'english' && (
					<>
						<div className='border' />
						<div className={s.specialLetters}>
							{charachters[`${game.language}`].map((le) => (
								<button className={s.letter}>{le.toUpperCase()}</button>
							))}
						</div>
					</>
				)}
			</section>
			<section className={s.infoSection}>
				{showAlphabet && (
					<>
						<Alphabet indicate={indicate} />
						<div className='border' />
					</>
				)}
				{info.map((inf, i) => (
					<>
						{i !== 0 && <div className='border' />}
						<div
							key={i}
							className={s.infoContainer}>
							<p>{inf.text}</p>
							<p
								style={{
									color: inf.color,
								}}>
								{inf.value}
							</p>
						</div>
					</>
				))}
			</section>
		</div>
	)
}

type InteractionProps = {
	game: Game
	dispatch: React.Dispatch<Action>
	showHints: boolean
	setShowHints: React.Dispatch<React.SetStateAction<boolean>>
	indicate: Indicate
}
