import classNames from 'classnames'
import s from './user-input.module.scss'

export default function Radial({ canEnable = true, text, func, active }: RadialBtn) {
	return (
		<>
			<div className={s.border} />
			<div className={s.radial}>
				<p>{text}</p>
				<button
					onClick={func}
					disabled={!canEnable}
					className={classNames(s.container, active ? s.active : s.unactive)}>
					<div className={s.circle} />
				</button>
			</div>
		</>
	)
}

export type RadialBtn = {
	text: string
	canEnable?: boolean
	func: () => void
	active: boolean
}
