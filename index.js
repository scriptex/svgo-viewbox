#!/usr/bin/env node

const { resolve } = require('path');
const { readFileSync } = require('fs');
const { readFile, writeFile } = require('fs').promises;

const { optimize, loadConfig } = require('svgo');

const { getFiles } = require('./utils');

const getInputFiles = async input => (!input ? [] : await getFiles(resolve(input)));

const getPathsFiles = async paths => {
	if (paths.length === 0) {
		return [];
	}

	let result = [];

	for (const path of paths) {
		const files = await getInputFiles(path);

		result = [...result, ...files];
	}

	return result;
};

module.exports = async (args, paths) => {
	let svgoConfig;
	let { input, svgoFile } = args;

	if (!input && paths.length === 0) {
		input = process.cwd();
	}

	try {
		svgoConfig = readFileSync(resolve(svgoFile));
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
