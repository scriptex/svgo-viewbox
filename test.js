// @ts-nocheck

const { resolve } = require('path');
const { existsSync, readFileSync } = require('fs');

const tape = require('tape');
const { parse } = require('svg-parser');

const svgoViewBox = require('.');

tape('svgoViewBox unit tests', async t => {
	const file = './assets/logo.svg';

	await svgoViewBox({
		input: './assets'
	});

	const svg = readFileSync(file, 'utf-8');
	const parsed = parse(svg);
	const hasViewBox = !!parsed.children[0].properties.viewBox;
	const fileExists = existsSync(resolve(__dirname, file));

	t.ok(fileExists, 'File exists');
	t.ok(hasViewBox, 'Has viewBox attribute');
	t.end();
});
