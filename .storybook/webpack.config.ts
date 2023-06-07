import path from 'path'
import { type Configuration } from 'webpack'

export default ({ config }: { config: Configuration }): Configuration => {
	if (config.resolve?.alias === undefined || config.module?.rules === undefined) {
		throw new Error('Storybook error alias or rules are undefined')
	}

	const paths = {
		src: path.resolve(__dirname, '..', 'src'),
		public: path.resolve(__dirname, '..', 'public'),
	}

	config.resolve.alias = {
		...config.resolve?.alias,
		'@app': path.join(paths.src, 'app'),
		'@pages': path.join(paths.src, 'pages'),
		'@widgets': path.join(paths.src, 'widgets'),
		'@features': path.join(paths.src, 'features'),
		'@entities': path.join(paths.src, 'entities'),
		'@shared': path.join(paths.src, 'shared'),
		'@images': path.join(paths.public, 'images'),
	}

	const cssLoader = {
		test: /\.s[ac]ss$/i,
		use: [
			'style-loader',
			{
				loader: 'css-loader',
				options: {
					modules: {
						auto: (resourcePath: string) => resourcePath.includes('.module.'),
						localIdentName: '[local]',
					},
				},
			},
			'sass-loader',
		],
	}

	const typescriptLoader = {
		test: /\.tsx?$/,
		use: 'ts-loader',
		exclude: /node_modules/,
	}

	const svgLoader = {
		test: /\.svg$/i,
		issuer: /\.[jt]sx?$/,
		use: ['@svgr/webpack'],
	}

	config.module.rules.forEach(rule => {
		// This modifies the existing image rule to exclude `.svg` files
		// since we handle those with `@svgr/webpack`.
		if (typeof rule !== 'string' && rule.type === 'asset/resource') {
			rule.exclude = /\.svg$/
		}
	})

	config.module.rules.push(...[cssLoader, typescriptLoader, svgLoader])

	return config
}
