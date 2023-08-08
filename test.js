const { resolve } = require('path');
const { execSync } = require('child_process');
const { existsSync, readFileSync, writeFileSync } = require('fs');

const tape = require('tape');
const { parse } = require('svg-parser');

const svgoViewBox = require('.');
const { getFiles } = require('./utils');

const assets = ['assets', 'assets2']
	.map(folder => resolve(__dirname, folder, 'logo.svg'))
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
		const fileExists = existsSync(resolve(__dirname, file));

		t.ok(fileExists, 'File exists');
		t.ok(hasViewBox, 'Has viewBox attribute');
	}

	resetFilesContents();

	t.end();
}

function addViewbox(message, input, paths = []) {
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

function addViewboxCLI(message, input, args = '') {
	tape('Executes CLI commands', async t => {
		execSync(`./cli.js -i ${input} ${args}`);

		await executeTest(input, t);
	});
}

addViewbox('Adds viewBox to files in a folder');
addViewbox('Adds viewBox to files in a folder', './assets');
addViewbox('Adds viewBox to a single file', './assets2/logo.svg');

addViewbox('Adds viewBox to files in a folder', undefined, ['./assets', './assets2']);
addViewbox('Adds viewBox to files in a folder', './assets', ['./assets/logo.svg', './assets2']);
addViewbox('Adds viewBox to a single file', './assets2/logo.svg', ['./assets', './assets2/logo.svg']);

addViewboxCLI('Uses an external SVGO config', './assets', '-f ./svgo.config.js');
addViewboxCLI('Uses the built-in SVGO config', './assets2');
