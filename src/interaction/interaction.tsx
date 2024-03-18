import { useEffect, useState } from 'react'
import { Action, Game, Difficulty, Language } from '../types/types'
import { newGame } from '../utils/newGame'
import { capitalizeFirstLetter, shorten } from '../utils/modify'
import s from './interaction.module.scss'
import Radial, { RadialBtn } from './radial'
import Alphabet from '../progress/alphabet'
import { Indicate } from '../App'

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
	showAlphabet,
	setShowAlphabet,
	indicate,
}: InteractionProps) {
	const [showWord, setShowWord] = useState<boolean>(true)

	useEffect(() => {
		newGame(dispatch, game)

		if (game.difficulty === 'extreme' || game.difficulty === 'hard') {
			setShowAlphabet(false)
			setShowHints(false)
		}

		document.getElementById('selectDiff')?.blur()
		document.getElementById('selectLang')?.blur()
	}, [game.difficulty, game.language])

	const devMode = window.location.origin === 'http://localhost:5173l'
	const hardMode = game.difficulty === 'extreme' || game.difficulty === 'hard'

	const difficulties = ['Easy', 'Medium', 'Hard', 'Extreme']
	const languages = ['english', 'swedish']
	const radialBtns: RadialBtn[] = [
		{
			text: 'hints',
			canEnable: game.difficulty !== 'extreme',
			dispatch: dispatch,
			setValue: setShowHints,
			value: showHints,
		},
		{
			text: 'alphabet',
			canEnable: !hardMode,
			dispatch: dispatch,
			setValue: setShowAlphabet,
			value: showAlphabet,
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

	function handleDifficulty(currentTarget: HTMLSelectElement) {
		if (currentTarget.id === 'selectDiff') {
			const newOption = currentTarget.value as Difficulty
			dispatch({ type: 'set-difficulty', payload: newOption })
			dispatch({
				type: 'set-toast',
				payload: { text: `Difficulty changed to ${newOption} and board reset.` },
			})
		}

		if (currentTarget.id === 'selectLang') {
			const newOption = currentTarget.value as Language
			dispatch({ type: 'set-language', payload: newOption })
			dispatch({
				type: 'set-toast',
				payload: { text: `Language of word changed to ${newOption} and board reset.` },
			})
		}

		dispatch({ type: 'set-time', payload: 0 })
		dispatch({ type: 'set-started', payload: false })
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
				<select
					onChange={(e) => handleDifficulty(e.currentTarget)}
					id='selectDiff'
					defaultValue={game.difficulty}>
					{difficulties.map((d) => (
						<option
							key={d}
							value={d.toLowerCase()}>
							{d}
						</option>
					))}
				</select>
				<div className='border' />
				<select
					onChange={(e) => handleDifficulty(e.currentTarget)}
					id='selectLang'
					defaultValue={game.difficulty}>
					{languages.map((d) => (
						<option
							key={d}
							value={d.toLowerCase()}>
							{capitalizeFirstLetter(d)}
						</option>
					))}
				</select>
				{devMode && showWord && (
					<>
						<div className='border' />
						<p style={{ color: 'var(--cta-400)' }}>{game.word}</p>
					</>
				)}
				{devMode && (
					<Radial
						setValue={setShowWord}
						dispatch={dispatch}
						value={showWord}
						text={'word'}
					/>
				)}
				{radialBtns.map((btn, i) => (
					<Radial
						key={i}
						text={btn.text}
						dispatch={btn.dispatch}
						setValue={btn.setValue}
						value={btn.value}
						canEnable={btn.canEnable}
					/>
				))}
				{game.language !== 'english' && (
					<>
						<div className='border' />
						<div>
							{charachters[`${game.language}`].map((le) => (
								<button className='letter'>{le.toUpperCase()}</button>
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
	showAlphabet: boolean
	setShowAlphabet: React.Dispatch<React.SetStateAction<boolean>>
	indicate: Indicate
}
