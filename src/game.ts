export const SIGN_X = 'x'
export const SIGN_O = 'o'

type Board = Array<Array<null | GameSign>>

export const getRandomNumber = (min: number, max: number): number => {
	return min + Math.floor(Math.random() * (max - min + 1))
}

const getHorizontalWinnerSign = (board: Board) => {
	if (board[0][0] === board[0][1] && board[0][1] === board[0][2]) {
		return board[0][0]
	}

	if (board[1][0] === board[1][1] && board[1][1] === board[1][2]) {
		return board[1][0]
	}

	if (board[2][0] === board[2][1] && board[2][1] === board[2][2]) {
		return board[2][0]
	}

	return null
}

const getVerticalWinnerSign = (board: Board) => {
	if (board[0][0] === board[1][0] && board[0][0] === board[2][0]) {
		return board[0][0]
	}

	if (board[0][1] === board[1][1] && board[0][1] === board[2][1]) {
		return board[0][1]
	}

	if (board[0][2] === board[1][2] && board[0][2] === board[2][2]) {
		return board[0][2]
	}

	return null
}

const getDiagonalWinnerSign = (board: Board) => {
	if (board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
		return board[0][0]
	}

	if (board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
		return board[0][2]
	}

	return null
}

type GameSign = typeof SIGN_X | typeof SIGN_O

type GameParams = {
	playerSign?: GameSign
}

type Game = {
	getPlayerSign: () => GameSign
	getAiSign: () => GameSign
	hasPlayerSign: (x: number, y: number) => boolean
	hasAiSign: (x: number, y: number) => boolean
	movePlayer: (x: number, y: number) => void
	moveAi: (x: number, y: number) => void
	getWinner: () => null | 'player' | 'ai'
	getBoard: () => Board
}

type State = {
	board: Board
	winner: 'player' | 'ai' | null
}

export const createGame = (params?: GameParams): Game => {
	const config = params ?? {}
	const { playerSign = 'x' } = config

	const state: State = {
		board: [
			[null, null, null],
			[null, null, null],
			[null, null, null],
		],
		winner: null,
	}

	const checkAndSetWinner = () => {
		const winnerSign =
			getVerticalWinnerSign(state.board) ??
			getHorizontalWinnerSign(state.board) ??
			getDiagonalWinnerSign(state.board)

		if (winnerSign === null) {
			return null
		}

		state.winner = winnerSign === getPlayerSign() ? 'player' : 'ai'
	}

	const getWinner = () => state.winner

	const checkIfCanMove = () => getWinner() === null

	const getPlayerSign = () => playerSign

	const getAiSign = () => (playerSign === 'x' ? 'o' : 'x')

	const getBoard = () => state.board

	const hasPlayerSign = (x: number, y: number) =>
		state.board[y][x] === getPlayerSign()

	const hasAiSign = (x: number, y: number) => state.board[y][x] === getAiSign()

	const moveAi = (x?: number, y?: number) => {
		if (!checkIfCanMove()) {
			return
		}

		const resolvedX = x ?? getRandomNumber(0, state.board.length - 1)
		const resolvedY = y ?? getRandomNumber(0, state.board[0].length - 1)

		if (state.board[resolvedY][resolvedX] !== null) {
			moveAi()

			return
		}

		state.board[resolvedY][resolvedX] = getAiSign()
		checkAndSetWinner()
	}

	const movePlayer = (x: number, y: number) => {
		if (!checkIfCanMove()) {
			return
		}

		if (!state.board[y][x]) {
			state.board[y][x] = getPlayerSign()
			checkAndSetWinner()
		}
	}

	return {
		getPlayerSign,
		getAiSign,
		hasPlayerSign,
		hasAiSign,
		movePlayer,
		moveAi,
		getWinner,
		getBoard,
	}
}
