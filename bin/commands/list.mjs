import { join, parse } from "node:path";
import { readdirSync } from "node:fs";
import { color, log } from "../../src/cnsl.mjs";
import { Err, say } from "../../src/err.mjs";
import { binDir } from "../.lib.mjs";

const url = import.meta.url;
const urlObj = parse(url);

export const title = `list of all awailable commands`;

export const desc = `
extended description with examples for the list command
`;

export const cmd = async (opts = {}) => {
	const dir = readdirSync("./bin/commands").sort((a, b) => a > b);
	log("Available commands:");
	for (const c of dir) {
		const p = join(binDir, "commands", c);
		const cmd = await import(p);
		log(
			color(c, "blue").replace(".mjs", "").padEnd(20, " "),
			color(say(cmd.title, "this command doesn't provide title 🪲"), "dim")
		);
	}
};
