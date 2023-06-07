module.exports = {
	settings: {
		react: {
			version: 'detect',
		},
	},
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'plugin:react/recommended',
		'standard-with-typescript',
		'plugin:i18next/recommended',
		'plugin:storybook/recommended',
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: ['./tsconfig.json'],
	},
	plugins: ['react'],
	globals: {
		__IS_DEV__: true,
	},
	rules: {
		'no-tabs': 'off',
		indent: ['error', 'tab'],
		'comma-dangle': [2, {
			arrays: 'always-multiline',
			objects: 'always-multiline',
			imports: 'always-multiline',
			exports: 'always-multiline',
			functions: 'never',
		}],
		'space-before-function-paren': 'off',
		'react/react-in-jsx-scope': 'off',
		'@typescript-eslint/indent': 'off',
		'@typescript-eslint/consistent-type-assertions': 'off',
		'@typescript-eslint/comma-dangle': 'off',
		'@typescript-eslint/naming-convention': 'off',
		'@typescript-eslint/no-floating-promises': 'off',
		'@typescript-eslint/space-before-function-paren': ['error', {
			anonymous: 'always',
			named: 'never',
			asyncArrow: 'always',
		}],
	},
	overrides: [
		{
			files: ['**/src/**/*.stories.{ts,tsx}'],
			rules: {
				'i18next/no-literal-string': 'off',
			},
		},
	],
}
