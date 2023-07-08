import { join } from "node:path";
import { existsSync } from "node:fs";
import { color, log } from "../../src/cnsl.mjs";
import { Err } from "../../src/err.mjs";
import { binDir } from "../.lib.mjs";

export const title = "shows command description";

export const cmd = async (name) => {
	Err.if.notString(
		name,
		"please add command name. " + color("ex: wh man list", "green")
	);
	const cmdPath = join(binDir, "commands", name) + ".mjs";
	Err.if.notExists(cmdPath, `unknow command: "${name}"`);

	const cmd = await import(cmdPath);
	log(color(`--- Command: "${name}" ---`, "blue"));
	log(color(cmd.desc.trim(), "dim"));
};
