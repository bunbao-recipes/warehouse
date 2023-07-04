#!/usr/bin/env node

import { join } from "path";
import { cwd } from "process";

import { log } from "../src/cnsl.mjs";
import { git } from "../src/git.mjs";
import { exe } from "../src/exe.mjs";
import { cwdfs } from "../src/cwdfs.mjs";
import { init } from "../index.mjs";

init();

const status = git.status();
const commits = git.commits();

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

const pckg = (
	await import(join(cwd(), "package.json"), {
		assert: { type: "json" },
	})
).default;

const updateType = versions[type];
log(
	"update type",
	`"${updateType || "preview"}". Current version is ${pckg.version}`
);

!updateType && process.exit();

const changelog = `
# v${pckg.version}
${commits.map((c) => `- ${c.msg.type}: ${c.msg.text}`).join("\n")}
`.trim();

if (status.length !== 0) {
	//cwdfs.writeFileSync("CHANGELOG.md", changelog);
	log(exe(`git add ."`));
	log(exe(`git commit -m "chore: progress"`));
	log(exe(`git push origin`));
} else {
	cwdfs.writeFileSync("CHANGELOG.md", changelog);
	log(exe(`git add CHANGELOG.md`));
	log(exe(`git commit -m "docs: changelog update"`));
	log(exe(`npm version ${versions[type]}`));
	log(exe(`git push origin`));
	log(exe(`git push origin --tags`));
}
