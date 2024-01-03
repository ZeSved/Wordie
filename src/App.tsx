import { useState } from 'react'
import './App.css'
import Board from './board/board'
import UserInput from './user-input/user-input'

export const DEFAULT_SETTINGS = {
	maxSize: 7,
	minSize: 4,
}

export type DefSet = typeof DEFAULT_SETTINGS

function App() {
	const [userSettings, setUserSettings] = useState<typeof DEFAULT_SETTINGS>(DEFAULT_SETTINGS)

	return (
		<>
			<Board />
			<UserInput
				userSettings={userSettings}
				setUserSettings={setUserSettings}
			/>
		</>
	)
}

export default App
