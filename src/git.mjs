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

export const git = {};

git.status = () => {
	const out = x("git status --porcelain");
	log({ out });
};
