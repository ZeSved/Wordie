import { Action, DefSet, Token } from '../types/types'

import s from './board.module.scss'
import { typeLetter } from '../utils/typeLetter'
import { useEffect } from 'react'
import classNames from 'classnames'

export default function Board({
	user,
	dispatch,
}: {
	user: DefSet
	dispatch: React.Dispatch<Action>
}) {
	function assignClasses(u: Token, i: number) {
		const classNames = [s.box]

		!u.guessed.content && classNames.push(s.hasContent)

		if (user.curRow > i) {
			u.guessed.correct && classNames.push(s.correct)
			u.guessed.existsAnywhere && classNames.push(s.guessed)
		}

		return classNames
	}

	function show(j: number) {
		for (let i = user.curRow; i >= 0; i--) {
			if (user.wordList[i][j].guessed.correct) return true
		}
	}

	useEffect(() => {
		function keyDownHandler(e: KeyboardEvent) {
			typeLetter(e, user, dispatch)
		}

		window.addEventListener('keydown', keyDownHandler)

		return () => {
			window.removeEventListener('keydown', keyDownHandler)
		}
	}, [user])

	return (
		<section className={s.main}>
			{user.wordList.map((ltr, i) => (
				<div
					className={user.curRow === i ? s.current : ''}
					key={i}>
					{ltr.map((lt, j) => (
						<div
							className={classNames(assignClasses(lt, i))}
							key={j}
							id={lt.content}>
							<p>
								{lt.guessed.content}
								{!lt.guessed.content && 'X'}
							</p>
						</div>
					))}
				</div>
			))}
		</section>
	)
}
