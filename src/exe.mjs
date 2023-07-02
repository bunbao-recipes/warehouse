export const exe = (cmd) => {
	return (
		"" +
		execSync(cmd, (error, stdout, stderr) => {
			if (error) {
				console.error(`error: ${error.message}`);
				return;
			}
			if (stderr) {
				console.error(`stderr: ${stderr}`);
				return;
			}
			return stdout;
		})
	).trim();
};
