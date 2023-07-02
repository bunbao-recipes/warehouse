import { execSync } from "child_process";
import { log } from "./cnsl.mjs";

const x = (cmd) => {
	return (
		"" +
		execSync(cmd, (error, stdout, stderr) => {
			if (error) {
				console.error(`error: ${error.message}`);
				return;
			}
			if (stderr) {
				console.error(`stderr: ${stderr}`);
				return;
			}
			//console.log(`stdout: ${stdout}`);
			return stdout;
		})
	).trim();
};

const parseMsg = (msg) => {
	let [type, text = ""] = msg.split(":");
	return {
		type: type.trim(),
		text: text.trim(),
	};
};

export const git = {};

git.status = () => {
	const out = x("git status --porcelain");
	return out
		.split("\n")
		.map((ent) => ent.trim())
		.filter((ent) => ent !== "");
};

git.branch = () => {
	const out = x("git branch");
	return out;
};

git.commits = () => {
	const o = x("git log origin/main..main");
	const out = o.split(/^commit|\ncommit/);
	const commits = [];

	for (let ent of out) {
		ent = ent.trim();
		if (ent === "") {
			continue;
		}
		const [meta, msg] = ent.split("\n\n");
		const [hash, ...props] = meta.split("\n");
		commits.push({
			//ent: ent,
			//meta,
			hash,
			props: props.reduce((acc, cur) => {
				const [varName, ...rest] = cur.split(":");
				acc[varName] = rest.join(":").trim();
				return acc;
			}, {}),
			msg: parseMsg(msg),
		});
	}
	return commits;
};
