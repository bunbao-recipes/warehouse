#!/usr/bin/env bun
import readline from "node:readline/promises";
import { existsSync } from "node:fs";
import { color, log } from "../src/cnsl.mjs";
import { parseArgv } from "./.lib.mjs";

const a = parseArgv();

if (a.args.length === 0) {
	log(`please set command name. ex: wh list`);
	process.exit();
}

const cmdName = a.args.shift();
const cmdFile = `./commands/${cmdName}.mjs`;
const cmd = await import(cmdFile);

if (typeof cmd.cmd !== "function") {
	throw new Error(`command "${cmdName}" doesn't provide cmd function`);
}

log();
log(color("--- WAREHOUSE CMD ---", "red"));
await cmd.cmd(...a.args, a.opts);
log();
// const i = readline.createInterface({
// 	input: process.stdin,
// 	output: process.stdout,
// });
// const answer = await i.question("ass?");
// console.log(`Oh, so your favorite sex is ${answer}`);
