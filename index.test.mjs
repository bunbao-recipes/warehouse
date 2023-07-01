import { test } from "node:test";
import { init } from "./index.mjs";

const log = console.log;

it("should just work", (t) => {
	init();
	t();
});
