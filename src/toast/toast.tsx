import { Toast as ToastProps } from '../types/types'
import s from './toast.module.scss'

export default function Toast({ text, isWarning = false }: ToastProps) {
	return (
		<div className={isWarning ? s.warning : s.toast}>{text && <p id='toast-text'>{text}</p>}</div>
	)
}
