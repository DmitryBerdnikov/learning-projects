export const SIGN_X = 'x'
export const SIGN_O = 'o'

type GameSign = typeof SIGN_X | typeof SIGN_O

type GameParams = {
	playerSign?: GameSign
}

type Game = {
	getPlayerSign: () => GameSign
	getAiSign: () => GameSign
}

export const createGame = (params?: GameParams): Game => {
	const config = params ?? {}
	const { playerSign = 'x' } = config

	const getPlayerSign = () => playerSign
	const getAiSign = () => (playerSign === 'x' ? 'o' : 'x')

	return {
		getPlayerSign,
		getAiSign,
	}
}
