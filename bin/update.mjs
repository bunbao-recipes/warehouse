#!/usr/bin/env node

import { exe } from "../src/exe.mjs";
import { log } from "../src/cnsl.mjs";
import { init } from "../index.mjs";

init();

log(exe("sudo npm i -g https://github.com/bunbao-recipes/warehouse.git"));
