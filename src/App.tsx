import { useReducer } from 'react'
import './App.css'
import Board from './board/board'
import UserInput from './user-input/user-input'
import { DefSet } from './types/types'
import { reducer } from './utils/reducer'

export const DEFAULT_SETTINGS: DefSet = {
	maxSize: 7,
	minSize: 4,
	word: '',
	wordList: [],
	curRow: 0,
}

function App() {
	const [user, dispatch] = useReducer(reducer, DEFAULT_SETTINGS)

	return (
		<div className='wrapper'>
			<div className='main'>
				<Board
					dispatch={dispatch}
					user={user}
				/>
				<UserInput
					user={user}
					dispatch={dispatch}
				/>
			</div>
		</div>
	)
}

export default App
