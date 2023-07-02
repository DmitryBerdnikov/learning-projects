import {
	type Game,
	type GameParams,
	getDiagonalWinnerSign,
	getHorizontalWinnerSign,
	getRandomNumber,
	getVerticalWinnerSign,
	MovementErrorAfterGameOver,
	type State,
	WrongTurnError,
} from './enitity'

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

		if (state.board[y][x] === null) {
			state.board[y][x] = getPlayerSign()
			state.whosTurn = 'ai'
			updateWinnerState()
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
