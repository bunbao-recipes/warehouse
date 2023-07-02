import { log } from "../src/cnsl.mjs";
import { git } from "../src/git.mjs";

const status = git.status();
const commits = git.commits();

const types = [["breaking"], ["feat"], ["chore", "docs", "quickfix"]];
const versions = ["major", "minor", "patch"];

console.log(commits);

for (const cmt of commits) {
	let type = 0;
}
