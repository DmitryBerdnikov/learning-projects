import { createGame, SIGN_X, SIGN_O } from "./game";

describe("players signs", () => {
	it("should be 'x' sign for player and 'o' for ai if sign param hasn't been passed", () => {
		const game = createGame();

		expect(game.getPlayerSign()).toBe(SIGN_X);
		expect(game.getAiSign()).toBe(SIGN_O);
	});

	it("should be 'x' sign for player and 'o' for ai if sign param 'x' has been passed", () => {
		const game = createGame();

		expect(game.getPlayerSign()).toBe(SIGN_X);
		expect(game.getAiSign()).toBe(SIGN_O);
	});


	it("should be 'o' sign for player and 'x' for ai if sign param 'o' has been passed", () => {
		const game = createGame({
			playerSign: 'o'
		});

		expect(game.getPlayerSign()).toBe(SIGN_O);
		expect(game.getAiSign()).toBe(SIGN_X);
	});
});
