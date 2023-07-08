import { parse } from "node:path";
import { color, log } from "../src/cnsl.mjs";

const url = import.meta.url;
const urlObj = parse(url);

export const binDir = urlObj.dir.replace("file:", "");

export const parseArgStr = (str) => {
	log(color("input:", "red"), str);
	const argv = str.split(" ");
	const propsIndex = argv.findIndex((ent) => ent.trim().slice(0, 2) === "--");

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

	const opts = argv
		.slice(propsIndex)
		.join(" ")
		.split("--")
		.filter((e) => e.trim() !== "")
		.reduce((acc, cur) => {
			const [key, ...val] = cur.split(" ");
			acc[key] = val.filter((i) => i.trim() !== "").join(" ");
			acc[key] === "" && (acc[key] = true);
			return acc;
		}, {});

	const args = argv.slice(0, propsIndex);

	const res = {
		args,
		opts,
	};

	return res;
};

export const parseArgv = (argv = process.argv) => {
	const propsIndex = argv.findIndex((ent) => ent === "--");
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

	const res = {
		args,
		opts,
	};

	return res;
};
