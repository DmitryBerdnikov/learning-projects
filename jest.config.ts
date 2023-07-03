/* eslint-disable import/no-default-export */

import { type Config } from 'jest'

const config: Config = {
	transform: {
		'^.+\\.ts$': 'ts-jest',
	},
	coverageThreshold: {
		global: {
			lines: 80,
		},
	},
}

export default config
