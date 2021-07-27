// @ts-nocheck

const { resolve } = require('path');
const { existsSync, readFileSync } = require('fs');

const tape = require('tape');
const { parse } = require('svg-parser');

const svgoViewBox = require('.');
const file = './assets/logo.svg';

(async () => {
	await svgoViewBox({
		input: './assets'
	});
})();

tape('file exists', t => {
	const fileExists = existsSync(resolve(__dirname, file));

	t.ok(fileExists, 'File exists');
	t.end();
});

tape('viewBox attribute is added', t => {
	const svg = readFileSync(file, 'utf-8');
	const parsed = parse(svg);
	const hasViewBox = !!parsed.children[0].properties.viewBox;

	t.ok(hasViewBox, 'Has viewBox attribute');
	t.end();
});
