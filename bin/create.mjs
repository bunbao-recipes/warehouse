#!/usr/bin/env bun

import { join } from "node:path";
import { argv } from "process";
import { mkdirSync, existsSync, writeFileSync } from "node:fs";
import { log } from "../src/cnsl.mjs";
import { cwd, cwdfs } from "../src/cwdfs.mjs";
import { init } from "../index.mjs";
import { Err } from "../src/err.mjs";

init();

const pckg = (name) => `
{
	"name": "${name}",
	"version": "0.1.0",
	"description": "Description of '${name}'",
	"main": "index.mjs",
	"types": "index.d.ts",
	"scripts": {
		"test": "node test",
		"git:push": "push origin --tags"
	},
	"repository": {
		"type": "git",
		"url": ""
	},
	"keywords": [
		"Warehouse",
		"${name}"
	],
	"author": "You",
	"license": "MIT",
	"homepage": "",
	"bin": {
		"${name}": "./bin/${name}.mjs",
	}
}
`;

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
	Err.if.notType(name, "string", "please set project name");
	opts && Err.if.notType(opts, "object", "unknown params list");

	opts = {
		dir: cwd || opts.dir,
		...opts,
	};

	const projectDir = join(opts.dir, name);

	!existsSync(projectDir) && mkdirSync(projectDir, { recursive: true });
	init(projectDir);
	writeFileSync(join(projectDir, "package.json"), pckg(name), "utf-8");
	log({
		projectDir,
		name,
		opts,
	});
};

main(args[0], opts);
