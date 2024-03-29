import { Action, Game, Token } from '../types/types'

import s from './game-board.module.scss'
import { handleKeyboardInput } from '../utils/handleKeyboardInput'
import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { Indicate } from '../App'

export default function Board({
	game,
	dispatch,
	showHints,
	indicate,
	setIndicate,
}: {
	game: Game
	dispatch: React.Dispatch<Action>
	showHints: boolean
	indicate: Indicate
	setIndicate: React.Dispatch<React.SetStateAction<Indicate>>
}) {
	const [progress, setProgress] = useState<number[]>([])
	const [progressOnRow, setProgressOnRow] = useState<ProgressOnRow>({ correct: [], exists: [] })
	const [guessedWord, setGuessedWord] = useState<string[]>([])

	useEffect(() => {
		setProgress([])
		setProgressOnRow({ correct: [], exists: [] })

		document.querySelectorAll('.letter').forEach((elem) => {
			;/'hint'/.test(elem.classList[1]) && elem.classList.remove(elem.classList[1])
		})
	}, [game.word])

	function assignClasses(u: Token, i: number, ltrI: number) {
		const classNames = [s.box]

		!u.guessed.content && classNames.push(s.empty)

		if (game.curRow === i && game.curRow > 0 && progress.includes(ltrI) && showHints) {
			classNames.splice(1, 1)
			classNames.push(s.hint)
		}

		if (u.guessed.content) {
			classNames.splice(1, 1)
		}

		if (game.curRow > i) {
			u.guessed.existsAnywhere && game.difficulty !== 'extreme' && classNames.push(s.guessed)
			u.guessed.correct && classNames.push(s.correct)
		}

		return classNames
	}

	useEffect(() => {
		function keyDownHandler(e: KeyboardEvent) {
			handleKeyboardInput(
				e,
				game,
				progress,
				progressOnRow,
				indicate,
				guessedWord,
				dispatch,
				setProgress,
				setProgressOnRow,
				setIndicate,
				setGuessedWord
			)
		}

		window.addEventListener('keydown', keyDownHandler)

		return () => {
			window.removeEventListener('keydown', keyDownHandler)
		}
	}, [game])

	useEffect(() => {
		if (game.status !== 'playing') {
			setProgress([])
		}
	}, [game.status])

	return (
		<section className={s.main}>
			{game.wordList.map((ltr, i) => (
				<div
					className={game.curRow === i ? s.current : ''}
					id={game.curRow === i ? 'current' : ''}
					key={i}>
					{ltr.map((lt, j) => (
						<div
							className={classNames(assignClasses(lt, i, j), 'letter')}
							key={j}
							id={lt.content}
							style={{ fontSize: `${window.innerHeight / 20}px` }}>
							<p>
								{lt.guessed.content}
								{!lt.guessed.content && lt.content}
							</p>
						</div>
					))}
				</div>
			))}
		</section>
	)
}

export type ProgressOnRow = { correct: string[]; exists: string[] }
