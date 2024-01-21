import { DefSet } from '../types/types'
import s from './board.module.scss'

export default function Board({ user }: { user: DefSet }) {
	console.log(user.wordList)
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
