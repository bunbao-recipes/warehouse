#!/usr/bin/env node

import { exe } from "../src/exe.mjs";
import { log } from "../src/cnsl.mjs";

log(exe("sudo npm i -g https://github.com/bunbao-recipes/warehouse.git"));
