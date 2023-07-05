#!/usr/bin/env bun

import { join } from "path";
import { cwd } from "process";

import { log } from "../src/cnsl.mjs";
import { git } from "../src/git.mjs";
import { exe } from "../src/exe.mjs";
import { cwdfs } from "../src/cwdfs.mjs";
import { init } from "../index.mjs";

init();

const types = {
	breaking: 2,
	feat: 1,
	chore: 0,
	docs: 0,
	quickfix: 0,
};

const title = "--- wh-release ---";
const separator = "".padEnd(title.length, "-");
log(title);
log("use conventional commits");
log("https://github.com/bunbao-recipes/warehouse/tree/main/docs/COMMITS.md");
log("allowed types:", Object.keys(types).join(","));
log(separator);

const status = git.status();
const commits = git.commits();

const versions = ["patch", "minor", "major"];

let type = -1;
for (const cmt of commits) {
	const cmtType = cmt.msg.type;
	if (types[cmtType] > type) {
		type = types[cmtType];
	}
}

const pckg = cwdfs.readFileSync("package.json", { json: true });

const updateType = versions[type];

log("update type:", `"${updateType || "preview"}".`);
log(`current version: ${pckg.version}`);
log(separator);

const changelog = `
# v${pckg.version}
${commits.map((c) => `- ${c.msg.type}: ${c.msg.text}`).join("\n")}
`.trim();

log(changelog);
log(separator);
log("this changes will be stashed and unstashed after commit");
log(status);
!updateType && process.exit();

//process.exit();
cwdfs.writeFileSync("CHANGELOG.md", changelog);
log(exe(`git add CHANGELOG.md`));
log(exe(`git commit -m "docs: changelog update to version x.y.z"`));
log(exe(`git stash`));
log(exe(`npm version ${versions[type]}`));
log(exe(`git push origin`));
log(exe(`git push origin --tags`));
log(exe(`git stash apply`));
