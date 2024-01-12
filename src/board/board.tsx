import { useEffect } from 'react'
import { Action, DefSet } from '../types/types'
import s from './board.module.scss'

export default function Board({
	user,
	dispatch,
}: {
	user: DefSet
	dispatch: React.Dispatch<Action>
}) {
	function typeLetter(e: KeyboardEvent) {
		const newArr = [...user.wordList]

		dispatch({ type: 'set-word-list', payload: newArr })
	}

	useEffect(() => {
		window.addEventListener('keydown', (e) => typeLetter(e))

		return () => {
			window.removeEventListener('keydown', typeLetter)
		}
	}, [])

	return (
		<section className={s.main}>
			{user.wordList.map((ltr, i) => (
				<div key={i}>
					{ltr.map((lt, i) => (
						<div
							className={s.box}
							key={i}
							id={lt.content}>
							{lt.guessed.content}
						</div>
					))}
				</div>
			))}
		</section>
	)
}
