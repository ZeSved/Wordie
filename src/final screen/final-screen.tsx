import { DefSet, Action } from '../types/types'
import ButtonBar from '../utils/components/ButtonBar'
import { generateWord } from '../utils/generateWord'
import s from './final-screen.module.scss'

export default function FinalScreen({
	user,
	dispatch,
}: {
	user: DefSet
	dispatch: React.Dispatch<Action>
}) {
	const content = [
		{
			name: 'Word: ',
			value: user.word,
		},
		{
			name: 'Number of attempts: ',
			value: user.curRow,
		},
		{
			name: 'Time taken: ',
			value: '...',
		},
		{
			name: 'Difficulty: ',
			value: user.difficulty,
		},
	]

	// const allTimeStats = JSON.parse(window.localStorage.getItem('allTimeStats')!)

	// const allTime = [
	// 	{
	// 		name: 'Word: ',
	// 		value: user.word,
	// 	},
	// ]

	return (
		<div className={s.blurContainer}>
			<div>
				<h2>You {user.status}!</h2>
				<ul>
					{content.map((c, i) => (
						<li key={i}>
							<p>
								{c.name}
								{c.value}
							</p>
						</li>
					))}
				</ul>
				<ul>
					{content.map((c, i) => (
						<li key={i}>
							<p>
								{c.name}
								{c.value}
							</p>
						</li>
					))}
				</ul>
				<ButtonBar>
					<div>
						<button
							onClick={() => {
								dispatch({ type: 'set-status', payload: 'playing' })
								generateWord(dispatch, user.difficulty)
							}}>
							Generate New Word
						</button>
					</div>
					<div>
						<button onClick={() => dispatch({ type: 'set-status', payload: 'playing' })}>
							Close
						</button>
					</div>
				</ButtonBar>
			</div>
		</div>
	)
}
