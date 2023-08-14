#!/usr/bin/env node

import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

import addViewbox from 'svgo-add-viewbox';
import { optimize, loadConfig } from 'svgo';

import { getInputFiles, getPathsFiles } from './utils.mjs';

const { readFile, writeFile } = promises;

const __dirname = dirname(fileURLToPath(import.meta.url));

const updatePlugins = (plugins = []) => {
	let result = [...plugins];

	const shouldAddPlugin = !plugins.find(plugin => plugin.name === addViewbox.name);

	if (shouldAddPlugin) {
		return [...result, addViewbox];
	}

	return result;
};

export default async (args, paths) => {
	let svgoConfig;
	let { input, svgoFile } = args;

	if (!input && paths.length === 0) {
		input = process.cwd();
	}

	try {
		svgoConfig = await loadConfig(resolve(svgoFile));
	} catch (e) {
		console.warn('Invalid or missing SVGO config file! Using default.');

		svgoConfig = await loadConfig(resolve(__dirname, 'svgo.config.mjs'));
	}

	svgoConfig.plugins = updatePlugins(svgoConfig.plugins);

	const inputFiles = await getInputFiles(input);
	const pathsFiles = await getPathsFiles(paths);
	const files = [...inputFiles, ...pathsFiles];

	for (const file of files) {
		const data = await readFile(file, 'utf-8');
		const result = optimize(data, svgoConfig);

		await writeFile(file, result.data);
	}
};
