import { Indicate } from '../App'
import s from './alphabet.module.scss'

export default function Alphabet({ indicate }: { indicate: Indicate }) {
	const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

	return (
		<div className={s.main}>
			{letters.map((letter) => (
				<p
					style={{
						color: indicate.correct.includes(letter)
							? '#00ff00'
							: indicate.inWord.includes(letter)
							? '#eeff00'
							: indicate.notInWord.includes(letter)
							? 'var(--secondary-faint)'
							: 'var(--secondary)',
					}}
					key={letter}>
					{letter}
				</p>
			))}
		</div>
	)
}
