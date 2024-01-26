import s from './ButtonBar.module.scss'

export default function ButtonBar({ children }: { children: React.ReactNode }) {
	return <div className={s.container}>{children}</div>
}
