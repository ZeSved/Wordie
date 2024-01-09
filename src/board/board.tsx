import { DefSet } from '../types/types'
import { calculateSize } from '../utils/calculateSize'
import s from './board.module.scss'

export default function Board({
	user,
	setUser,
}: {
	user: DefSet
	setUser: React.Dispatch<React.SetStateAction<DefSet>>
}) {
	return (
		<section className={s.main}>
			{user.wordList.map((ltr, i) => (
				<div key={i}>
					{ltr.map((lt, i) => (
						<input
							key={i}
							type='text'
							// placeholder={lt.content}
							style={{
								height: calculateSize(user.wordList[0]),
								aspectRatio: calculateSize(user.wordList[0]),
							}}
							id={lt.content}
						/>
					))}
				</div>
			))}
		</section>
	)
}
