const { resolve } = require('path');
const { existsSync, readFileSync } = require('fs');

const tape = require('tape');
const { parse } = require('svg-parser');

const svgoViewBox = require('.');
const { getFiles } = require('./utils');

function addViewbox(message, input) {
	tape(message, async t => {
		await svgoViewBox({
			input
		});

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

		t.end();
	});
}

addViewbox('Adds viewBox to files in a folder');
addViewbox('Adds viewBox to files in a folder', './assets');
addViewbox('Adds viewBox to a single file', './assets2/logo.svg');
