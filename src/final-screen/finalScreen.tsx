import { DefSet, Action } from '../types/types'
import s from './finalScreen.module.scss'

export default function FinalScreen({
	user,
}: // dispatch,
{
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
	]
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
			</div>
		</div>
	)
}
