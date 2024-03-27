import { useEffect, useState } from 'react'
import { Action, Game } from '../types/types'
import { newGame } from '../utils/newGame'
import { shorten } from '../utils/modify'
import s from './interaction.module.scss'
import Option, { InputBtn } from './option'
import { Indicate } from '../App'
import classNames from 'classnames'

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
	}, [game.difficulty])

	const hardMode = game.difficulty === 'extreme' || game.difficulty === 'hard'
	const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

	const difficulties = ['Easy', 'Medium', 'Hard', 'Extreme']
	const inputBtns: InputBtn[] = [
		{
			text: 'difficulty',
			inputType: 'select',
			displayText: game.difficulty,
			content: difficulties,
			defaultValue: game.difficulty,
		},
		{
			text: 'Show Hints',
			canEnable: game.difficulty !== 'extreme',
			setValue: setShowHints,
			value: showHints,
			inputType: 'button',
			displayText: '?',
		},
		{
			text: 'Show Alphabet',
			canEnable: !hardMode,
			setValue: setShowAlphabet,
			value: showAlphabet,
			inputType: 'button',
			displayText: 'ABC',
		},
		{
			text: 'Regenerate Word',
			func: () => {
				newGame(dispatch, game)
				dispatch({ type: 'set-toast', payload: { text: 'Generated new word and reset game.' } })
			},
			inputType: 'button',
			hasSvg: true,
			canEnable: true,
			toggleable: false,
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
			</section>
			<section className={s.infoSection}>
				<div className={classNames(s.letters, showAlphabet ? s.show : s.hide)}>
					<div>
						{letters.map((letter) => (
							<p
								style={{
									color: indicate.correct.includes(letter)
										? '#00ff00'
										: indicate.inWord.includes(letter)
										? '#eeff00'
										: indicate.notInWord.includes(letter)
										? 'var(--secondary-faint)'
										: 'var(--secondary)',
								}}
								key={letter}>
								{letter}
							</p>
						))}
					</div>
					<div className='border' />
				</div>
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
