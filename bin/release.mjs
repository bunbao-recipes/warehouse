import { log } from "../src/cnsl.mjs";
import { git } from "../src/git.mjs";
import { exe } from "../src/exe.mjs";
import { join } from "path";
import { cwd } from "process";
import { cwdfs } from "../src/cwdfs.mjs";

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

const changelog = `
# Version ${pckg.version}
${commits.map((c) => `- ${c.msg.type}: ${c.msg.text}`).join("\n")}
`.trim();

log("update type", `"${versions[type]}". Current version is ${pckg.version}`);
// log(changelog);

if (!versions[type]) {
	log("no updates");
	process.exit();
}

if (status.length !== 0) {
	log("git working dir is not empty. Writing to CHANGELOG_PREVIEW.md");
	cwdfs.writeFileSync("CHANGELOG_PREVIEW.md", changelog);
} else {
	cwdfs.writeFileSync("CHANGELOG.md", changelog);
	log(exe(`git add CHANGELOG.md`));
	log(exe(`git commit -m "docs: changelog update"`));
	log(exe(`npm version ${versions[type]}`));
	log(exe(`git push origin --tags`));
}
