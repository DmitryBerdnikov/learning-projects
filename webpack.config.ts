import path from 'path'
import { type Configuration } from 'webpack'
import { buildWebpackConfig } from './webpack/buildWebpackConfig'
import { type BuildEnv, type BuildPaths } from './webpack/types/config'

export default (env: BuildEnv): Configuration => {
	const paths: BuildPaths = {
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		build: path.resolve(__dirname, 'build'),
		html: path.resolve(__dirname, 'public', 'index.html'),
		src: path.resolve(__dirname, 'src'),
		public: path.resolve(__dirname, 'public'),
	}

	const mode = env.mode ?? 'development'
	const isDev = mode === 'development'
	const isAnalyzeEnabled = env.analyze === true
	const PORT = env.port ?? 3000

	const config: Configuration = buildWebpackConfig({
		mode,
		paths,
		isDev,
		isAnalyzeEnabled,
		port: PORT,
	})

	return config
}
