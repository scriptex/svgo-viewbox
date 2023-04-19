#!/usr/bin/env node

const { resolve } = require('path');
const { readFileSync } = require('fs');
const { readFile, writeFile } = require('fs').promises;

const { optimize, loadConfig } = require('svgo');

const { getFiles } = require('./utils');

module.exports = async args => {
	let svgoConfig;
	let { input, svgoFile } = args;

	if (!input) {
		input = process.cwd();
	}

	try {
		svgoConfig = readFileSync(resolve(svgoFile));
	} catch (e) {
		console.warn('Invalid or missing SVGO config file! Using default.');

		svgoConfig = await loadConfig(resolve(__dirname, 'svgo.config.js'));
	}

	const folder = resolve(input);
	const files = await getFiles(folder);

	for (const file of files) {
		const data = await readFile(file, 'utf-8');

		// @ts-ignore
		const result = optimize(data, svgoConfig);

		await writeFile(file, result.data);
	}
};
