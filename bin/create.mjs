#!/usr/bin/env bun

import { join } from "node:path";
import { argv } from "process";
import { mkdirSync, existsSync } from "node:fs";
import { log } from "../src/cnsl.mjs";
import { cwd, cwdfs } from "../src/cwdfs.mjs";
import { init } from "../index.mjs";

init();

const parseArgv = () => {
	const propsIndex = process.argv.findIndex((i) => i.slice(0, 2) === "--");

	if (propsIndex === -1) {
		const res = {
			args: argv
				.slice(2)
				.filter((i) => i.trim() !== "")
				.map((i) => i.trim()),
			opts: {},
		};
		return res;
	}

	const opts = process.argv
		.slice(propsIndex)
		.join(" ")
		.split("--")
		.filter((e) => e !== "")
		.reduce((acc, cur) => {
			const [key, ...val] = cur.split(" ");
			acc[key] = val.filter((i) => i.trim() !== "").join(" ");
			return acc;
		}, {});

	const args = process.argv.slice(2, propsIndex);

	return {
		args,
		opts,
	};
};

const { args, opts } = parseArgv();

const main = (name, opts) => {
	if (opts && typeof opts !== "object") {
		throw new Error("unknown params list");
	}

	opts = {
		dir: cwd || opts.dir,
		...opts,
	};

	const projectDir = join(opts.dir, name);

	!existsSync(projectDir) && mkdirSync(projectDir, { recursive: true });

	log({
		projectDir,
		name,
		opts,
	});
};

main(...args, opts);
