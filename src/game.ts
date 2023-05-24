export const SIGN_X = 'x'
export const SIGN_O = 'o'

export const getRandomNumber = (min: number, max: number): number => {
	return min + Math.floor(Math.random() * (max - min + 1))
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
	move: (x: number, y: number) => void
	getWinner: () => null | 'player' | 'ai'
}

export const createGame = (params?: GameParams): Game => {
	const config = params ?? {}
	const { playerSign = 'x' } = config
	const board: Array<Array<null | GameSign>> = [
		[null, null, null],
		[null, null, null],
		[null, null, null],
	]

	const getWinner = () => null

	const getPlayerSign = () => playerSign

	const getAiSign = () => (playerSign === 'x' ? 'o' : 'x')

	const hasPlayerSign = (x: number, y: number) =>
		board[x][y] === getPlayerSign()

	const hasAiSign = (x: number, y: number) => board[x][y] === getAiSign()

	const moveAi = () => {
		const x = getRandomNumber(0, board.length - 1)
		const y = getRandomNumber(0, board[0].length - 1)

		if (board[x][y] !== null) {
			moveAi()

			return
		}

		board[x][y] = getAiSign()
	}

	const movePlayer = (x: number, y: number) => {
		if (!board[x][y]) {
			board[x][y] = getPlayerSign()
			moveAi()
		}
	}

	return {
		getPlayerSign,
		getAiSign,
		hasPlayerSign,
		hasAiSign,
		move: movePlayer,
		getWinner,
	}
}
