/** */
import crypto from "node:crypto";
import { log } from "../src/cnsl.mjs";

const creds = () => {
	const salt = "AsxSF";
	const uuid = crypto.randomUUID();
	const username = uuid.replace(/-/g, "_").replace(/[^a-z]+/gi, "");
	const password = uuid.replace(/-/g, "_") + salt.toUpperCase();
	const name =
		username[0].toUpperCase() + username.slice(0, username.length / 2);
	const lastName =
		username[1].toUpperCase() + username.slice((username.length / 2) * -1);

	return {
		uuid,
		username,
		password,
		name,
		lastName,
	};
};

log(creds());
