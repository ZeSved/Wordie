import { Action, DefSet, Token } from '../types/types'

import s from './game-board.module.scss'
import { handleKeyboardInput } from '../utils/handleKeyboardInput'
import { useEffect, useState } from 'react'
import classNames from 'classnames'

export default function Board({
	user,
	dispatch,
}: {
	user: DefSet
	dispatch: React.Dispatch<Action>
}) {
	const [progress, setProgress] = useState<number[]>([])

	function assignClasses(u: Token, i: number, ltrI: number) {
		const classNames = [s.box]

		!u.guessed.content && classNames.push(s.empty)

		if (user.curRow === i && user.curRow > 0 && progress.includes(ltrI)) {
			classNames.splice(1, 1)
			classNames.push(s.hint)
		}

		if (u.guessed.content) {
			classNames.splice(1, 1)
		}

		if (user.curRow > i) {
			u.guessed.correct && classNames.push(s.correct)
			u.guessed.existsAnywhere && user.difficulty !== 'extreme' && classNames.push(s.guessed)
		}

		return classNames
	}

	useEffect(() => {
		function keyDownHandler(e: KeyboardEvent) {
			handleKeyboardInput(e, user, dispatch, progress, setProgress)
		}

		window.addEventListener('keydown', keyDownHandler)

		return () => {
			window.removeEventListener('keydown', keyDownHandler)
		}
	}, [user])

	useEffect(() => {
		if (user.status !== 'playing') {
			setProgress([])
		}
	}, [user.status])

	return (
		<section className={s.main}>
			{user.wordList.map((ltr, i) => (
				<div
					className={user.curRow === i ? s.current : ''}
					key={i}>
					{ltr.map((lt, j) => (
						<div
							className={classNames(assignClasses(lt, i, j))}
							key={j}
							id={lt.content}>
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
