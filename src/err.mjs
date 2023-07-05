import { log } from "./cnsl.mjs";

export class Err extends Error {
	static if = {};
	static throw = (message, code) => {
		throw new Err(message, code);
	};

	code;

	constructor(message, code) {
		super(message || "error");
		this.code = code || "generic";
	}
}

const say = {};
say.not = (what, isNotA) => `"${what}" is not a "${isNotA}"`;

const _if = Err.if;
const _throw = Err.throw;

_if.true = (val, message, code) => val === true && _throw(message, code);

_if.notType = (val, type, message) => {
	typeof val !== type && _throw(message || say.not(val, type));
};
