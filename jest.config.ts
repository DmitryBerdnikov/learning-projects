/* eslint-disable import/no-default-export */

import { type Config } from 'jest'

const config: Config = {
	transform: {
		'^.+\\.ts$': 'ts-jest',
	},
	coverageReporters: ['json-summary'],
}

export default config
