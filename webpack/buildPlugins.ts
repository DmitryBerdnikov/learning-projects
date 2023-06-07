import { DefinePlugin, type WebpackPluginInstance, ProgressPlugin } from 'webpack'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { type BuildOptions } from './types/config'

const plugins = [
	new MiniCssExtractPlugin({
		filename: 'css/[name].[contenthash:8].css',
		chunkFilename: 'css/[name].[contenthash:8].css',
	}),
	new ProgressPlugin(),
]

export function buildPlugins({
	paths,
	isDev,
	isAnalyzeEnabled,
}: BuildOptions): WebpackPluginInstance[] {
	plugins.push(
		new DefinePlugin({
			__IS_DEV__: isDev,
		})
	)

	plugins.push(
		new HTMLWebpackPlugin({
			template: paths.html,
		})
	)

	if (isDev) {
		plugins.push(new ReactRefreshWebpackPlugin({ overlay: false }))
	}

	if (isAnalyzeEnabled) {
		plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'static' }))
	}

	return plugins
}
