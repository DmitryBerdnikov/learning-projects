export const SIGN_X = "x";
export const SIGN_O = "o";

type GameParams = {
	playerSign?: typeof SIGN_X | typeof SIGN_O;
};

export const createGame = (params?: GameParams) => {
	const config = params ?? {};
	const { playerSign = "x" } = config;

	const getPlayerSign = () => playerSign;
	const getAiSign = () => (playerSign === "x" ? "o" : "x");

	return {
		getPlayerSign,
		getAiSign,
	};
};
