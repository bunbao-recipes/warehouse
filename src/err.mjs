import { log } from "./cnsl.mjs";
import { existsSync } from "node:fs";

export class Err extends Error {
	static if = {};
	static throw = (message, code) => {
		throw new Err(message, code);
	};

	constructor(message, code) {
		super(message || "error");
		this.code = code || "generic";
	}
}

/**
 * @param {string} message
 * @returns
 */
export const say = (message, fallback) => {
	return message?.trim().toLowerCase() || fallback;
};

/**
 * @param {string} what
 * @param {string} isNotA
 * @returns
 */
say.not = (what, isNotA) => `"${what}" is not a "${isNotA}"`;

const _if = Err.if;
const _throw = Err.throw;

_if.true = (val, message, code) => val === true && _throw(message, code);

_if.notType = (val, type, message) => {
	typeof val !== type && _throw(message || say.not(val, type));
};

_if.notString = (val, message) => {
	typeof val !== "string" && _throw(message || say.not(val, "string"));
};

_if.notExists = (path, message) => {
	Err.if.true(!existsSync(path), message);
};
