import { DefSet } from '../types/types'
import s from './board.module.scss'

export default function Board({
	user,
	setUser,
}: {
	user: DefSet
	setUser: React.Dispatch<React.SetStateAction<DefSet>>
}) {
	window.addEventListener('keydown', (e) => {
		const newArr = [...user.wordList]

		// for (let i = 0; i < 6; i++)

		newArr[
			newArr.findIndex((item) => item[item.findIndex((it) => it.guessed.content.length === 0)])
		][
			newArr.findIndex((item) => item[item.findIndex((it) => it.guessed.content.length === 0)])
		].guessed.content = e.key.toUpperCase()

		setUser({
			maxSize: user.maxSize,
			minSize: user.minSize,
			word: user.word,
			wordList: newArr,
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
