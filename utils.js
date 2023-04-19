const { resolve } = require('path');
const { readdir } = require('fs').promises;
const { lstatSync } = require('fs');

async function getFiles(dir) {
	if (lstatSync(dir).isFile()) {
		return [dir].filter(file => file.endsWith('.svg'));
	}

	const dirents = await readdir(dir, { withFileTypes: true });
	const files = await Promise.all(
		dirents.map(dirent => {
			const res = resolve(dir, dirent.name);
			return dirent.isDirectory() ? getFiles(res) : res;
		})
	);

	// @ts-ignore
	return [].concat(...files).filter(file => file.endsWith('.svg'));
}

exports.getFiles = getFiles;
