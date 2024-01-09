module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint/eslint-plugin'],
	extends: [
		'plugin:@typescript-eslint/recommended',
	],
	root: true,
	env: {
		node: true,
		jest: true,
	},
	ignorePatterns: ['.eslintrc.js'],
	rules: {
		'semi': [2, "always"],
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'error',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'linebreak-style': ['error', 'windows'],
		'indent': ['error', 'tab', { 'SwitchCase': 1, 'ignoredNodes': ['PropertyDefinition'] }],
		'quotes': [2, 'single', { allowTemplateLiterals: true, avoidEscape: true }],
		'lines-between-class-members': ['error', 'always'],
		'no-multiple-empty-lines': ['error', { 'max': 2, 'maxEOF': 0 }],
	},
};
