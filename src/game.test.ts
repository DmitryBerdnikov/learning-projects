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

describe('game', () => {
	// TODO: Test fails because of ai move is random, it should be mocked
	it('should have correct signs in the game board', () => {
		const game = createGame()

		game.move(0, 1)
		let firstRoundAiSignsCount = 0

		for (let x = 0; x < 3; x += 1) {
			for (let y = 0; y < 3; y += 1) {
				if (game.hasAiSign(x, y)) {
					firstRoundAiSignsCount += 1
				}

				if (x === 0 && y === 1) {
					expect(game.hasPlayerSign(x, y)).toBeTruthy()

					continue
				}

				expect(game.hasPlayerSign(x, y)).toBeFalsy()
			}
		}

		expect(firstRoundAiSignsCount).toBe(1)
		expect(game.getWinner()).toBeNull()

		game.move(1, 1)
		let secondRoundAiSignsCount = 0

		for (let x = 0; x < 3; x += 1) {
			for (let y = 0; y < 3; y += 1) {
				if (game.hasAiSign(x, y)) {
					secondRoundAiSignsCount += 1
				}

				if ((x === 0 && y === 1) || (x === 1 && y === 1)) {
					expect(game.hasPlayerSign(x, y)).toBeTruthy()

					continue
				}

				expect(game.hasPlayerSign(x, y)).toBeFalsy()
			}
		}

		expect(secondRoundAiSignsCount).toBe(2)
		expect(game.getWinner()).toBeNull()

		game.move(2, 1)
		let thirdRoundAiSignsCount = 0

		for (let x = 0; x < 3; x += 1) {
			for (let y = 0; y < 3; y += 1) {
				if (game.hasAiSign(x, y)) {
					thirdRoundAiSignsCount += 1
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
			}
		}

		expect(thirdRoundAiSignsCount).toBe(3)
		expect(game.getWinner()).toBe('player')
	})
})
