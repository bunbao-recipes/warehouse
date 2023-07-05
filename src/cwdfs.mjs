import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const _ = (path) => {
	return join(cwd, path);
};

export const cwdfs = {};

export const cwd = process.cwd();

cwdfs.writeFileSync = (path, text, opts = "utf-8") => {
	return writeFileSync(_(path), text, opts);
};

cwdfs.readFileSync = (path, opts = {}) => {
	opts = {
		json: false,
		...opts,
	};
	const text = readFileSync(_(path), "utf-8");

	if (opts.json) {
		return JSON.parse(text);
	}

	return text;
};
