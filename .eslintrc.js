module.exports = {
	extends: [
		require.resolve('@csssr/linters/eslint/base'),
		require.resolve('@csssr/linters/eslint/typescript'),
	],
	rules: {
		// Disable rule, because it exists in @csssr/linters, but it's deprecated https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-duplicate-imports.md
		'@typescript-eslint/no-duplicate-imports': 'off',
		'import/no-duplicates': 'error',
	},
}
