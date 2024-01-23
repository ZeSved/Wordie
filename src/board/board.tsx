import { useEffect } from 'react'
import { Action, DefSet } from '../types/types'
import s from './board.module.scss'
import { typeLetter } from '../utils/typeLetter'

export default function Board({
	user,
	dispatch,
}: {
	user: DefSet
	dispatch: React.Dispatch<Action>
}) {
	console.log(user.wordList)

	useEffect(() => {
		window.addEventListener('keydown', (e) =>
			dispatch({ type: 'set-word-list', payload: typeLetter(e, user)! })
		)

		return () => {
			window.removeEventListener('keydown', (e) =>
				dispatch({ type: 'set-word-list', payload: typeLetter(e, user)! })
			)
		}
	}, [])

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
