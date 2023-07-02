import { log } from "../src/cnsl.mjs";
import { git } from "../src/git.mjs";
import { exe } from "../src/exe.mjs";
const status = git.status();
const commits = git.commits();

// const types = [["breaking"], ["feat"], ["chore", "docs", "quickfix"]];
// const versions = ["major", "minor", "patch"];

const types = {
	breaking: 2,
	feat: 1,
	chore: 0,
	docs: 0,
	quickfix: 0,
};

const versions = ["patch", "minor", "major"];

let type = -1;
for (const cmt of commits) {
	const cmtType = cmt.msg.type;
	if (types[cmtType] > type) {
		type = types[cmtType];
	}
}
//log(commits);
//log(type);
const changelog = `
# Version
${commits.map((c) => `${c.msg.type}:\t${c.msg.text}`).join("\n")}
`.trim();
log(type, versions[type]);
log(changelog);
