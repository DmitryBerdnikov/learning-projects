module.exports = {
	parser: '@babel/eslint-parser',
	extends: [
		require.resolve('@csssr/linters/eslint/base'),
		require.resolve('@csssr/linters/eslint/react'),
	],
}
