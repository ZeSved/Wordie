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
	const allTime = JSON.parse(window.localStorage.getItem('allTimeStats')!)

	const stats = [
		{
			title: 'This Game',
			content: [
				{ value: `Word: ${user.word}` },
				{ value: `Number of Attempts: ${user.curRow}` },
				{ value: `Time Taken: ${user.timeTaken}` },
				{ value: `Difficulty: ${user.difficulty}` },
			],
		},
		{
			title: 'All Time',
			content: [
				{ value: `Games Played: ${allTime.games.played}` },
				{ value: `Games Won: ${allTime.games.won}` },
				{ value: `Win Ratio: ${(allTime.games.won / allTime.games.played) * 100}%` },
			],
		},
	]

	return (
		<div className={s.blurContainer}>
			<div>
				<h2>You {user.status}!</h2>
				{stats.map(({ content, title }) => (
					<>
						<h3>{title}</h3>
						<ul>
							{content.map(({ value }) => (
								<li key={value}>
									<p>{value}</p>
								</li>
							))}
						</ul>
					</>
				))}
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
