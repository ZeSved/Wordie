import { DefSet, Action } from '../types/types'
import ButtonBar from '../utils/components/ButtonBar'
import { newGame } from '../utils/generateWord'
import { shorten } from '../utils/shorten'
import s from './final-screen.module.scss'

export default function FinalScreen({
	user,
	dispatch,
}: {
	user: DefSet
	dispatch: React.Dispatch<Action>
}) {
	const allTime = JSON.parse(window.localStorage.getItem('allTimeStats')!)

	function capitalizeLetter(word: string | string[]) {
		if (typeof word === 'string') {
			const newWord = word.split('')

			newWord[0] = newWord[0].toUpperCase()
			return newWord.join('')
		}
	}

	const stats = [
		{
			title: 'This Game',
			content: [
				{ name: `Word:`, value: capitalizeLetter(user.word) },
				{ name: `Number of Attempts:`, value: user.curRow },
				{ name: `Time Taken:`, value: user.timeTaken },
				{ name: `Difficulty: `, value: capitalizeLetter(user.difficulty) },
			],
		},
		{
			title: 'All Time',
			content: [
				{ name: `Games Played:`, value: allTime.games.played },
				{ name: `Games Won: `, value: allTime.games.won },
				{
					name: `Win Ratio: `,
					value: shorten((allTime.games.won / allTime.games.played) * 100) + '%',
				},
			],
		},
	]

	return (
		<div className={s.blurContainer}>
			<div>
				<h2>You {user.status}!</h2>
				{user.status === 'lost' && (
					<div className={s.cause}>
						<h3>Cause: </h3>
						<h3>{user.timeTaken >= 600 ? 'Time Ran Out' : 'Failed To Guess'}</h3>
					</div>
				)}
				{stats.map(({ content, title }) => (
					<>
						<h3>{title}</h3>
						<ul>
							{content.map(({ value, name }) => (
								<li key={name}>
									<p>{name}</p>
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
								newGame(dispatch, user)
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
