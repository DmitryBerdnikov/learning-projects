import type { StorybookConfig } from '@storybook/react-webpack5'

const config: StorybookConfig = {
	stories: ['../src/**/*.stories.@(ts|tsx)'],
	addons: [{
		name: '@storybook/addon-essentials',
		options: {},
	}],
	framework: {
		name: '@storybook/react-webpack5',
		options: {},
	},
}

export default config
