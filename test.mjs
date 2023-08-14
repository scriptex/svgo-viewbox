import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

import tape from 'tape';
import { parse } from 'svg-parser';

import svgoViewBox from './index.mjs';
import { getFiles } from './utils.mjs';

const assets = ['assets', 'assets2']
	.map(folder => resolve(folder, 'logo.svg'))
	.map(file => ({
		[file]: readFileSync(file, 'utf-8')
	}));

function resetFilesContents() {
	for (const asset of assets) {
		const [file, content] = Object.entries(asset)[0];
		writeFileSync(file, content);
	}
}

async function executeTest(input, t) {
	const files = await getFiles(resolve(input || process.cwd()));

	for (const file of files) {
		const svg = readFileSync(file, 'utf-8');
		const parsed = parse(svg);
		// @ts-ignore
		const hasViewBox = !!parsed.children[0].properties.viewBox;
		const fileExists = existsSync(resolve(file));

		t.ok(fileExists, 'File exists');
		t.ok(hasViewBox, 'Has viewBox attribute');
	}

	resetFilesContents();

	t.end();
}

function addViewBox(message, input, paths = []) {
	tape(message, async t => {
		await svgoViewBox(
			{
				input
			},
			paths
		);

		await executeTest(input, t);
	});
}

function addViewBoxCLI(message, input, args = '') {
	tape(message, async t => {
		spawnSync(`./cli.js -i ${input} ${args}`, { shell: false });

		await executeTest(input, t);
	});
}

addViewBox('Adds viewBox to files in a folder');
addViewBox('Adds viewBox to files in a folder', './assets');
addViewBox('Adds viewBox to a single file', './assets2/logo.svg');

addViewBox('Adds viewBox to files in a folder', undefined, ['./assets', './assets2']);
addViewBox('Adds viewBox to files in a folder', './assets', ['./assets/logo.svg', './assets2']);
addViewBox('Adds viewBox to a single file', './assets2/logo.svg', ['./assets', './assets2/logo.svg']);

addViewBoxCLI('Uses an external SVGO config', './assets', '-f ./svgo.config.js');
addViewBoxCLI('Uses the built-in SVGO config', './assets2');
