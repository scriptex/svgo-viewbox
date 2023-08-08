#!/usr/bin/env node

const { resolve } = require('path');
const { readFile, writeFile } = require('fs').promises;

const { optimize, loadConfig } = require('svgo');

const { getInputFiles, getPathsFiles } = require('./utils');

module.exports = async (args, paths) => {
	let svgoConfig;
	let { input, svgoFile } = args;

	if (!input && paths.length === 0) {
		input = process.cwd();
	}

	try {
		svgoConfig = loadConfig(resolve(svgoFile));
	} catch (e) {
		console.warn('Invalid or missing SVGO config file! Using default.');

		svgoConfig = await loadConfig(resolve(__dirname, 'svgo.config.js'));
	}

	const inputFiles = await getInputFiles(input);
	const pathsFiles = await getPathsFiles(paths);
	const files = [...inputFiles, ...pathsFiles];

	for (const file of files) {
		const data = await readFile(file, 'utf-8');

		// @ts-ignore
		const result = optimize(data, svgoConfig);

		await writeFile(file, result.data);
	}
};
