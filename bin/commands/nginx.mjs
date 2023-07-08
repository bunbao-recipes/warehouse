import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { color, log } from "../../src/cnsl.mjs";
import { dirs } from "../.lib.mjs";
import { say } from "../../src/err.mjs";

export const title = `
Generates nginx config and self-signed certificates with openssl
`;

const _config = (port) => {
	return `{
server {
		listen 80;
		#listen 443;
		#server_name XXX;
	  
		#ssl on;
		#ssl_certificate XXX;
		#ssl_certificate_key XXX;
	  
		location / {
		  proxy_pass http://localhost:${port};
		  proxy_set_header X-Real-IP $remote_addr; # http://wiki.nginx.org/HttpProxyModule
		  proxy_http_version 1.1; # recommended for keep-alive connections per http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_http_version
		  proxy_set_header Upgrade $http_upgrade;
		  proxy_set_header Connection "upgrade";
		  proxy_set_header Host $host;
		}
	}
}`.trim();
};

export const cmd = (namePort) => {
	const [name, port = 3000] = namePort.split(":");
	const path = join(dirs.tmp, `${name}.nginx`);
	const includePath = join(dirs.tmp, `${name}.include.nginx`);
	log("nginx.mjs", { name, port });
	//log(_config(port));
	log(path);
	writeFileSync(path, _config(port), "utf-8");
	writeFileSync(includePath, `include ${path}`, "utf-8");
	log(color(say("run in terminal"), "red"));
	log(`sudo cp ${includePath} /etc/nginx/sites-enabled/${name}.nginx`);
};
