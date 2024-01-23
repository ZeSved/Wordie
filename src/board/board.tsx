import { Action, DefSet } from '../types/types'

import s from './board.module.scss'
import { typeLetter } from '../utils/typeLetter'
import { useEffect } from 'react'

export default function Board({
	user,
	dispatch,
}: {
	user: DefSet
	dispatch: React.Dispatch<Action>
}) {
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
					{ltr.map((lt, i) => (
						<div
							className={`${s.box} ${lt.guessed.correct && s.correct} ${
								!lt.guessed.content && s.hasContent
							}`}
							key={i}
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
