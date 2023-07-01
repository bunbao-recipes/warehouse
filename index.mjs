import fs, { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "node:path";

const log = console.log;
const cwd = process.cwd();
const _path = (p) => join(cwd, p);

const templates = {};

templates["src/"] = {};

templates[".gitignore"] = `
node_modules/
.local/
`;

templates[".editorconfig"] = `
root = true
ass = ass
[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
indent_style = tab
`;

templates[".eslintrc.js"] = `
module.exports = {
	"env": {
		"browser": true,
		"es2021": true,
		"node": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended"
	],
	"overrides": [
	],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"plugins": [
		"@typescript-eslint"
	],
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		]
	}
};
`;

export function init() {
	for (const [k, v] of Object.entries(templates)) {
		const pth = _path(k);
		if (pth.slice(-1) === "/") {
			// folder
			!existsSync(pth) && mkdirSync(pth);
		} else {
			// file
			writeFileSync(pth, v.trim());
		}
	}
}
