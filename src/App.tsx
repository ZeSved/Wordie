import { useState } from 'react'
import './App.css'
import Board from './board/board'
import UserInput from './user-input/user-input'
import { DefSet } from './types/types'

export const DEFAULT_SETTINGS: DefSet = {
	maxSize: 7,
	minSize: 4,
	word: '',
	wordList: [],
}

function App() {
	const [user, setUser] = useState<DefSet>(DEFAULT_SETTINGS)

	return (
		<div className='wrapper'>
			<div className='main'>
				<Board
					setUser={setUser}
					user={user}
				/>
				<UserInput
					user={user}
					setUser={setUser}
				/>
			</div>
		</div>
	)
}

export default App
