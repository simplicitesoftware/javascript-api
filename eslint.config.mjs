import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
});

export default [ ...compat.extends('eslint:recommended', 'plugin:@typescript-eslint/recommended'), {
	plugins: {
		'@typescript-eslint': typescriptEslint,
	},
	languageOptions: {
		globals: {
			...globals.browser,
			...globals.commonjs,
			...globals.node,
			...globals.jest,
		},
		parser: tsParser,
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		'indent': ['error', 'tab'],
		'quotes': ['error', 'single'],
		'semi': ['error', 'always'],
		'@typescript-eslint/no-explicit-any': 'off',
		'no-multiple-empty-lines': ['error', { max: 1 }],
		'no-multi-spaces': [ 'error', { ignoreEOLComments: true } ],
		'no-trailing-spaces': [ 'error', { skipBlankLines: false } ],
		'max-len': 'off',
		'no-console': 'error',
		'no-debugger': 'error'
	},
}];