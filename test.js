const { exec } = require('child_process');
const { resolve } = require('path');
const { existsSync, readFileSync } = require('fs');

const tape = require('tape');
const { parse } = require('svg-parser');

const svgoViewBox = require('.');

function addViewbox(message, input) {
	tape(message, async t => {
		const file = './assets/logo.svg';

		await svgoViewBox({
			input
		});

		const svg = readFileSync(file, 'utf-8');
		const parsed = parse(svg);
		// @ts-ignore
		const hasViewBox = !!parsed.children[0].properties.viewBox;
		const fileExists = existsSync(resolve(__dirname, file));

		t.ok(fileExists, 'File exists');
		t.ok(hasViewBox, 'Has viewBox attribute');
		t.end();
	});
}

addViewbox('Adds viewBox to files in a folder', './assets');
addViewbox('Adds viewBox to a single file', './assets2/logo.svg');

exec('svgo-viewbox -i ./assets', (err, stdout, stderr) => {
	console.log({ err, stdout, stderr });
});
