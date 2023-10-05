export const SIGN_X = 'x'
export const SIGN_O = 'o'

export type Board = Array<Array<null | GameSign>>

export type GameSign = typeof SIGN_X | typeof SIGN_O

export type GameParticipant = 'player' | 'ai'

export type Game = {
	getPlayerSign: () => GameSign
	getAiSign: () => GameSign
	hasPlayerSign: (x: number, y: number) => boolean
	hasAiSign: (x: number, y: number) => boolean
	movePlayer: (x: number, y: number) => void
	moveAi: (x: number, y: number) => void
	getWinner: () => null | GameParticipant
	getBoard: () => Board
}

export type State = {
	board: Board
	winner: GameParticipant | null
	whosTurn: GameParticipant
}

export type GameParams = {
	playerSign?: GameSign
}

export class WrongTurnError extends Error {
	constructor({
		actualTurn,
		expectedTurn,
	}: {
		actualTurn: GameParticipant
		expectedTurn: GameParticipant
	}) {
		super(
			`Wrong turn, it must be turn of ${expectedTurn}, but got turn of ${actualTurn}`
		)
		this.name = 'WrongTurnError'
	}
}

export class MovementErrorAfterGameOver extends Error {
	constructor() {
		super('Can not make a movement after game over')
		this.name = 'MovementErrorAfterGameOver'
	}
}

export class MovementErrorTwiceAlongTheSameCoordinates extends Error {
	constructor() {
		super('Can not make a movement twice along the same coordinates')
		this.name = 'MovementErrorTwiceAlongTheSameCoordinates'
	}
}

export const getRandomNumber = (min: number, max: number): number => {
	return min + Math.floor(Math.random() * (max - min + 1))
}

export const getHorizontalWinnerSign = (board: Board): GameSign | null => {
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

export const getVerticalWinnerSign = (board: Board): GameSign | null => {
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

export const getDiagonalWinnerSign = (board: Board): GameSign | null => {
	if (board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
		return board[0][0]
	}

	if (board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
		return board[0][2]
	}

	return null
}
