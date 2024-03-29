import { Game, Action } from '../types/types'
import { newGame } from '../utils/newGame'
import { shorten } from '../utils/modify'
import { allTimeStats } from '../App'
import s from './final-screen.module.scss'
import { capitalize } from '../utils/modify'

export default function FinalScreen({
	game,
	dispatch,
}: {
	game: Game
	dispatch: React.Dispatch<Action>
}) {
	const allTime = JSON.parse(
		window.localStorage.getItem('allTimeStats') ?? JSON.stringify(allTimeStats)
	)

	const stats: Stats[] = [
		{
			title: 'This Game',
			content: [
				{
					name: `Word:`,
					value: capitalize(game.word),
					linkSrc: `https://www.oxfordlearnersdictionaries.com/definition/english/${game.word}_1?q=${game.word}`,
				},
				{ name: `Number of Attempts:`, value: game.curRow },
				{ name: `Time Taken:`, value: game.timeTaken === 0 ? '< 0' : game.timeTaken },
				{ name: `Difficulty: `, value: capitalize(game.difficulty) },
				{ name: `Correct Guesses Per Second: `, value: shorten(allTime.averageCorrectPerSecond) },
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
				<h2>You {game.status}!</h2>
				{game.status === 'lost' && (
					<div className={s.cause}>
						<h3>Cause: </h3>
						<h3>{game.timeTaken >= 600 ? 'Time Ran Out' : 'Failed To Guess'}</h3>
					</div>
				)}
				{stats.map(({ content, title }) => (
					<>
						<h3>{title}</h3>
						<ul>
							{content.map(({ value, name, linkSrc }) => (
								<li key={name}>
									<p>{name}</p>
									{linkSrc ? (
										<a
											target='_blank'
											href={linkSrc}>
											{value}
										</a>
									) : (
										<p>{value}</p>
									)}
								</li>
							))}
						</ul>
					</>
				))}
				<div className={s.input}>
					<div>
						<button
							onClick={() => {
								dispatch({ type: 'set-status', payload: 'playing' })
								newGame(dispatch, game)
							}}>
							Generate New Word
						</button>
					</div>
					<div
						className='border'
						style={{ height: 'calc(var(--gap-1) * 2)' }}
					/>
					<div>
						<button onClick={() => dispatch({ type: 'set-status', payload: 'playing' })}>
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

type Stats = {
	title: string
	content: {
		name: string
		value: string | number
		linkSrc?: string
	}[]
}
