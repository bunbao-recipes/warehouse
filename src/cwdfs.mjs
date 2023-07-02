import fs from "node:fs";
import { join } from "node:path";

const _ = (path) => {
	return join(cwd, path);
};

export const cwdfs = {};

export const cwd = process.cwd();

cwdfs.writeFileSync = (path, text, opts = "utf-8") => {
	fs.writeFileSync(_(path), text, opts);
};
