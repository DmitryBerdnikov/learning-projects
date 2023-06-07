import { createGame, SIGN_O, SIGN_X } from './game'

describe('players signs', () => {
	it("should be 'x' sign for player and 'o' for ai if sign param hasn't been passed", () => {
		const game = createGame()

		expect(game.getPlayerSign()).toBe(SIGN_X)
		expect(game.getAiSign()).toBe(SIGN_O)
	})

	it("should be 'x' sign for player and 'o' for ai if sign param 'x' has been passed", () => {
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

describe('the player wins', () => {
	it('should be the win by horizontally', () => {
		// o - -
		// x x x
		// - o -
		const game = createGame()

		game.movePlayer(0, 1)
		game.moveAi(0, 0)

		expect(game.getWinner()).toBeNull()

		game.movePlayer(1, 1)
		game.moveAi(1, 2)

		expect(game.getWinner()).toBeNull()

		game.movePlayer(2, 1)
		game.moveAi(2, 2)

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
		const game = createGame()

		game.movePlayer(0, 0)
		game.moveAi(1, 0)

		expect(game.getWinner()).toBeNull()

		game.movePlayer(0, 1)
		game.moveAi(1, 2)

		expect(game.getWinner()).toBeNull()

		game.movePlayer(0, 2)
		game.moveAi(2, 2)

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
		game.moveAi(1, 0)

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
