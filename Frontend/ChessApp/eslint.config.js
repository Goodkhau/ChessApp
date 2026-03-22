import js from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
	globalIgnores(['dist']),
	{
		files: ['**/*.{ts,tsx}'],
		extends: [
			js.configs.recommended,
			tseslint.configs.recommended,
			reactHooks.configs.flat.recommended,
			reactRefresh.configs.vite,
		],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		rules: {
			"semi": ["error", "always"],
			"@typescript-eslint/array-type": ["error", {
				default: "array-simple",
				readonly: "generic",
			}],
			// Trailing commas
			"comma-dangle": ["error", {
				arrays: "always-multiline",
				objects: "always-multiline",
				imports: "always-multiline",
				functions: "always-multiline",
			}],
			// Tab-based indentation
			"indent": "off", // Turn off base rule
			"@/indent": ["error", "tab", {
				SwitchCase: 1,
			}],
			"no-tabs": "off",
			// Consistent spacing
			"object-curly-spacing": ["error", "always"],
			"array-bracket-spacing": ["error", "never"],
			"space-before-blocks": ["error", "always"],
			"keyword-spacing": ["error", {
				before: true,
				after: true,
			}],
			"space-infix-ops": "error",
			"comma-spacing": ["error", {
				before: false,
				after: true,
			}],
		},
	},
])