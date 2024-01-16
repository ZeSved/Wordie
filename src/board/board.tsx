import { useEffect } from 'react'
import { Action, DefSet } from '../types/types'
import s from './board.module.scss'
import { boardCheck } from '../utils/boardCheck'

export default function Board({
	user,
	dispatch,
}: {
	user: DefSet
	dispatch: React.Dispatch<Action>
}) {
	function typeLetter(e: KeyboardEvent) {
		const indexesOfFirst = boardCheck(user)
		const newArr = [...user.wordList]
		const indexedArr = newArr[indexesOfFirst.index1][indexesOfFirst.index2]

		switch (true) {
			case /^[a-z]$/.test(e.key):
				if (
					indexesOfFirst.index1 === user.curRow &&
					indexesOfFirst.index2 === 0 &&
					newArr[user.curRow][0].guessed.content !== ''
				)
					return

				indexedArr.guessed.content = e.key.toUpperCase()
				if (indexedArr.content === indexedArr.guessed.content)
					indexedArr.guessed.correct = true
				break
			case e.key === 'Backspace':
				console.log('works')
		}

		dispatch({ type: 'set-word-list', payload: newArr })
	}

	useEffect(() => {
		window.addEventListener('keydown', typeLetter)

		return () => {
			window.removeEventListener('keydown', typeLetter)
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
