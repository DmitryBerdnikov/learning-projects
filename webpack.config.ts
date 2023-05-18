/* eslint-disable import/no-default-export */

import path from 'path'

import { type Configuration } from 'webpack'

type EnvConfig = {
	mode: 'production' | 'development'
}

export default (env: EnvConfig): Configuration => {
	const config: Configuration = {
		mode: env.mode ?? 'development',
		entry: './src/game.ts',
		output: {
			filename: 'game.js',
			path: path.resolve('build'),
			clean: true,
		},
		module: {
			rules: [
				{
					test: /\.ts$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				},
			],
		},
	}

	return config
}
