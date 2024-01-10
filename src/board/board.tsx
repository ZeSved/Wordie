import { DefSet } from '../types/types'
import { findFirst } from '../utils/findFirst'
import s from './board.module.scss'

export default function Board({
	user,
	setUser,
}: {
	user: DefSet
	setUser: React.Dispatch<React.SetStateAction<DefSet>>
}) {
	window.addEventListener('keydown', (e) => {
		setUser({
			maxSize: user.maxSize,
			minSize: user.minSize,
			word: user.word,
			wordList: findFirst(user.wordList, e),
		})
	})

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
