import fs, { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const cwd = process.cwd();
const _path = (p, dir) => {
	if (dir) {
		return join(dir, p);
	}
	return join(cwd, p);
};

const templates = {};
templates[".warehouse/"] = {};
templates[".local/"] = {};
templates["src/"] = {};

templates[".gitignore"] = `
.warehouse/
.local/

.tmp/
.dev/

node_modules/
.DS_Store
`;

templates[".editorconfig"] = `
root = true
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

templates[".npmrc"] = `
sign-git-tag=false
message="release: %s"
`;

export function init(dir) {
	for (const [k, v] of Object.entries(templates)) {
		const pth = _path(k, dir);
		if (pth.slice(-1) === "/") {
			// folder
			!existsSync(pth) && mkdirSync(pth);
		} else {
			// file
			writeFileSync(pth, v.trim());
		}
	}
}
