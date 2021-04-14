#!/usr/bin/env node

const { resolve } = require('path');
const { readFileSync } = require('fs');
const { readdir, readFile, writeFile } = require('fs').promises;

const { optimize, loadConfig } = require('svgo');

async function getFiles(dir) {
	const dirents = await readdir(dir, { withFileTypes: true });
	const files = await Promise.all(
		dirents.map(dirent => {
			const res = resolve(dir, dirent.name);
			return dirent.isDirectory() ? getFiles(res) : res;
		})
	);

	return [].concat(...files);
}

module.exports = async args => {
	const { input, svgoFile } = args;

	/**
	 * @type any
	 */
	let svgoConfig;

	try {
		svgoConfig = readFileSync(resolve(svgoFile));
	} catch (e) {
		console.warn('Invalid or missing SVGO config file! Using default.');

		svgoConfig = await loadConfig(resolve(__dirname, 'svgo.config.js'));
	}

	const folder = resolve(input);
	const files = await getFiles(folder);
	const paths = files.filter(file => file.endsWith('.svg'));

	for (const path of paths) {
		const data = await readFile(path, 'utf-8');
		const result = optimize(data, svgoConfig);

		await writeFile(path, result.data);
	}
};
