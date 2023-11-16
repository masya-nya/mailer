module.exports = {
	'env': {
		'browser': true,
		'es2021': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended'
	],
	'overrides': [
		{
			'env': {
				'node': true
			},
			'files': [
				'.eslintrc.{js,cjs}'
			],
			'parserOptions': {
				'sourceType': 'script'
			}
		}
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'plugins': [
		'@typescript-eslint',
		'react'
	],
	'rules': {
		'semi': [2, 'always'],
		'no-tabs': 0,
		'dot-notation': 0,
		'indent': ['error', 'tab', { 'SwitchCase': 1 }],
		'no-unused-vars': 0,
		'eol-last': 0,
		'no-return-assign': 0,
		'react/no-unknown-property': 0,
		'no-extra-boolean-cast': 'off',
		'react/display-name': 0,
		'react/react-in-jsx-scope': 'off',
		'quotes': [2, 'single', { 'avoidEscape': true }],
		'no-trailing-spaces': ['error', { 'skipBlankLines': true }]
	}
};
