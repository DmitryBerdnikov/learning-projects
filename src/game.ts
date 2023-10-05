import {
	type Game,
	type GameParams,
	getDiagonalWinnerSign,
	getHorizontalWinnerSign,
	getRandomNumber,
	getVerticalWinnerSign,
	MovementErrorAfterGameOver,
	MovementErrorTwiceAlongTheSameCoordinates,
	type State,
	WrongTurnError,
} from './entity'

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
		whosTurn: 'player',
	}

	const updateWinnerState = () => {
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

	const checkIfPlayerCanMove = () => state.whosTurn === 'player'

	const checkIfAiCanMove = () => state.whosTurn === 'ai'

	const checkIsGameOver = () => getWinner() !== null

	const getPlayerSign = () => playerSign

	const getAiSign = () => (playerSign === 'x' ? 'o' : 'x')

	const getBoard = () => state.board

	const hasPlayerSign = (x: number, y: number) =>
		state.board[y][x] === getPlayerSign()

	const hasAiSign = (x: number, y: number) => state.board[y][x] === getAiSign()

	const moveAi = (x?: number, y?: number) => {
		if (checkIsGameOver()) {
			throw new MovementErrorAfterGameOver()
		}

		if (!checkIfAiCanMove()) {
			throw new WrongTurnError({
				actualTurn: 'ai',
				expectedTurn: 'player',
			})
		}

		// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
		const hasX = x || x === 0
		// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
		const hasY = y || y === 0

		if (hasX && hasY && state.board[y][x] !== null) {
			throw new MovementErrorTwiceAlongTheSameCoordinates()
		}

		const resolvedX = x ?? getRandomNumber(0, state.board.length - 1)
		const resolvedY = y ?? getRandomNumber(0, state.board[0].length - 1)

		if (state.board[resolvedY][resolvedX] !== null) {
			moveAi()

			return
		}

		state.board[resolvedY][resolvedX] = getAiSign()
		state.whosTurn = 'player'
		updateWinnerState()
	}

	const movePlayer = (x: number, y: number) => {
		if (checkIsGameOver()) {
			throw new MovementErrorAfterGameOver()
		}

		if (!checkIfPlayerCanMove()) {
			throw new WrongTurnError({
				actualTurn: 'player',
				expectedTurn: 'ai',
			})
		}

		if (state.board[y][x] !== null) {
			throw new MovementErrorTwiceAlongTheSameCoordinates()
		}

		state.board[y][x] = getPlayerSign()
		state.whosTurn = 'ai'
		updateWinnerState()
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
