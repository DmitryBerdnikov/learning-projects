import {
	MovementErrorAfterGameOver,
	MovementErrorTwiceAlongTheSameCoordinates,
	SIGN_O,
	SIGN_X,
	WrongTurnError,
} from './entity'
import { createGame } from './game'

describe('players signs', () => {
	it("should be 'x' sign for player and 'o' for ai if sign param hasn't been passed", () => {
		const game = createGame()

		expect(game.getPlayerSign()).toBe(SIGN_X)
		expect(game.getAiSign()).toBe(SIGN_O)
	})

	it("should be 'o' sign for player and 'x' for ai if sign param 'o' has been passed", () => {
		const game = createGame({
			playerSign: 'o',
		})

		expect(game.getPlayerSign()).toBe(SIGN_O)
		expect(game.getAiSign()).toBe(SIGN_X)
	})
})

describe('rules of the game', () => {
	it('should be an error if moving to the same coordinates twice', () => {
		const game = createGame({
			playerSign: SIGN_X,
		})

		game.movePlayer(0, 0)
		expect(game.moveAi.bind(null, 0, 0)).toThrow(
			MovementErrorTwiceAlongTheSameCoordinates
		)

		game.moveAi(0, 1)

		expect(game.movePlayer.bind(null, 0, 1)).toThrow(
			MovementErrorTwiceAlongTheSameCoordinates
		)

		game.movePlayer(0, 2)

		expect(game.getBoard()).toEqual([
			[SIGN_X, null, null],
			[SIGN_O, null, null],
			[SIGN_X, null, null],
		])
	})

	it('should be no more than one movement at a time for a participant in the game', () => {
		const game = createGame()

		game.movePlayer(0, 1)
		expect(game.movePlayer.bind(null, 0, 2)).toThrow(WrongTurnError)

		game.moveAi(0, 2)
		expect(game.moveAi.bind(null, 0, 2)).toThrow(WrongTurnError)
	})

	it('should be no movement after the game over', () => {
		const game = createGame()

		game.movePlayer(0, 0)
		game.moveAi(0, 1)

		game.movePlayer(1, 0)
		game.moveAi(0, 2)

		game.movePlayer(2, 0)

		expect(game.getWinner()).toBe('player')
		expect(game.moveAi.bind(null, 2, 0)).toThrow(MovementErrorAfterGameOver)
		expect(game.movePlayer.bind(null, 2, 1)).toThrow(MovementErrorAfterGameOver)
	})
})

describe('the player wins', () => {
	it('should be the win by horizontally', () => {
		// o - -
		// x x x
		// - o -
		const game = createGame()

		expect(game.getPlayerSign()).toBe(SIGN_X)
		expect(game.getAiSign()).toBe(SIGN_O)

		game.movePlayer(0, 1)
		game.moveAi(0, 0)

		expect(game.getWinner()).toBeNull()

		game.movePlayer(1, 1)
		game.moveAi(1, 2)

		expect(game.getWinner()).toBeNull()

		game.movePlayer(2, 1)

		for (let x = 0; x < 3; x += 1) {
			for (let y = 0; y < 3; y += 1) {
				if ((x === 0 && y === 0) || (x === 1 && y === 2)) {
					expect(game.hasAiSign(x, y)).toBeTruthy()

					continue
				}

				if (
					(x === 0 && y === 1) ||
					(x === 1 && y === 1) ||
					(x === 2 && y === 1)
				) {
					expect(game.hasPlayerSign(x, y)).toBeTruthy()

					continue
				}

				expect(game.hasPlayerSign(x, y)).toBeFalsy()
				expect(game.hasAiSign(x, y)).toBeFalsy()
			}
		}

		expect(game.getWinner()).toBe('player')
	})

	it('should be the win by vertically', () => {
		// x o -
		// x - -
		// x o -
		const game = createGame({
			playerSign: 'o',
		})

		expect(game.getPlayerSign()).toBe(SIGN_O)
		expect(game.getAiSign()).toBe(SIGN_X)

		game.movePlayer(0, 0)
		game.moveAi(1, 0)

		expect(game.getWinner()).toBeNull()

		game.movePlayer(0, 1)
		game.moveAi(1, 2)

		expect(game.getWinner()).toBeNull()

		game.movePlayer(0, 2)

		for (let x = 0; x < 3; x += 1) {
			for (let y = 0; y < 3; y += 1) {
				if ((x === 1 && y === 0) || (x === 1 && y === 2)) {
					expect(game.hasAiSign(x, y)).toBeTruthy()

					continue
				}

				if (
					(x === 0 && y === 0) ||
					(x === 0 && y === 1) ||
					(x === 0 && y === 2)
				) {
					expect(game.hasPlayerSign(x, y)).toBeTruthy()

					continue
				}

				expect(game.hasPlayerSign(x, y)).toBeFalsy()
				expect(game.hasAiSign(x, y)).toBeFalsy()
			}
		}

		expect(game.getWinner()).toBe('player')
	})

	it('should be the win by diagonally', () => {
		// o - x
		// - x -
		// x - o
		const game = createGame()

		game.movePlayer(2, 0)
		game.moveAi(0, 0)

		expect(game.getWinner()).toBeNull()

		game.movePlayer(1, 1)
		game.moveAi(2, 2)

		expect(game.getWinner()).toBeNull()

		game.movePlayer(0, 2)

		for (let x = 0; x < 3; x += 1) {
			for (let y = 0; y < 3; y += 1) {
				if ((x === 0 && y === 0) || (x === 2 && y === 2)) {
					expect(game.hasAiSign(x, y)).toBeTruthy()

					continue
				}

				if (
					(x === 2 && y === 0) ||
					(x === 1 && y === 1) ||
					(x === 0 && y === 2)
				) {
					expect(game.hasPlayerSign(x, y)).toBeTruthy()

					continue
				}

				expect(game.hasPlayerSign(x, y)).toBeFalsy()
				expect(game.hasAiSign(x, y)).toBeFalsy()
			}
		}

		expect(game.getWinner()).toBe('player')
	})
})
