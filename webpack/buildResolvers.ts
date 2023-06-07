import path from 'path'
import { type ResolveOptions } from 'webpack'
import { type BuildOptions } from './types/config'

export function buildResolvers({ paths }: BuildOptions): ResolveOptions {
	return {
		extensions: ['.tsx', '.ts', '.jsx', '.js'],
		modules: [paths.src, 'node_modules'],
		alias: {
			'@app': path.join(paths.src, 'app'),
			'@pages': path.join(paths.src, 'pages'),
			'@widgets': path.join(paths.src, 'widgets'),
			'@features': path.join(paths.src, 'features'),
			'@entities': path.join(paths.src, 'entities'),
			'@shared': path.join(paths.src, 'shared'),
			'@images': path.join(paths.public, 'images'),
		},
		// mainFiles: ['index'], (It's default value)
		// preferAbsolute: true, (Don't know why we need this)
	}
}
