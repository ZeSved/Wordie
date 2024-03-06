import { useEffect } from 'react'
import { Action, Game, Difficulty } from '../types/types'
import { newGame } from '../utils/newGame'
import { shorten } from '../utils/shorten'
import s from './user-input.module.scss'
import Radial, { RadialBtn } from './radial'

type Info = {
	text: string
	color?: string
	value: string | number
	onlyShow?: boolean
}

export default function gameInput({
	game,
	dispatch,
	showHints,
	setShowHints,
	showAlphabet,
	setShowAlphabet,
}: {
	game: Game
	dispatch: React.Dispatch<Action>
	showHints: boolean
	setShowHints: React.Dispatch<React.SetStateAction<boolean>>
	showAlphabet: boolean
	setShowAlphabet: React.Dispatch<React.SetStateAction<boolean>>
}) {
	useEffect(() => {
		newGame(dispatch, game)

		if (game.difficulty === 'extreme' || game.difficulty === 'hard') {
			setShowAlphabet(false)
			setShowHints(false)
		}
	}, [game.difficulty])

	const devMode = window.location.origin === 'http://localhost:5173l'
	const difficulties = ['Easy', 'Medium', 'Hard', 'Extreme']
	const hardMode = game.difficulty === 'extreme' || game.difficulty === 'hard'

	const radialBtns: RadialBtn[] = [
		{
			active: showHints,
			text: showHints ? 'Hide Hints' : 'Show Hints',
			canEnable: game.difficulty !== 'extreme',
			func: () => setShowHints(!showHints),
		},
		{
			active: showAlphabet,
			text: showAlphabet ? 'Hide Alphabet' : 'Show Alphabet',
			canEnable: !hardMode,
			func: () => setShowAlphabet(!showAlphabet),
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

	function handleDifficulty(currentTarget: HTMLSelectElement) {
		const diff = currentTarget.value as Difficulty

		dispatch({ type: 'set-time', payload: 0 })
		dispatch({ type: 'set-difficulty', payload: diff })
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
					defaultValue={game.difficulty}>
					{difficulties.map((d) => (
						<option
							key={d}
							value={d.toLowerCase()}>
							{d}
						</option>
					))}
				</select>
				{devMode && (
					<>
						<div className={s.border} />
						<p style={{ color: 'var(--cta-400)' }}>{game.word}</p>
					</>
				)}
				{radialBtns.map((btn, i) => (
					<Radial
						key={i}
						active={btn.active}
						text={btn.text}
						func={btn.func}
						canEnable={btn.canEnable}
					/>
				))}
			</section>
			<section>
				{info.map((inf, i) => (
					<>
						{i !== 0 && <div className={s.border} />}
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
