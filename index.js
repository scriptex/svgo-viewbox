#!/usr/bin/env node

// @ts-nocheck

const { resolve } = require('path');
const { readFileSync } = require('fs');
const { readdir, readFile, writeFile } = require('fs').promises;

const SVGO = require('svgo');
const yaml = require('js-yaml');

let counter = 0;

const getAttr = (svg, attr) => parseFloat(svg.attr(attr).value.replace(/px$/, ''));

const addViewBox = svg => {
	if (svg.isElem(['svg']) && !svg.hasAttr('viewBox') && svg.hasAttr('width') && svg.hasAttr('height')) {
		const width = getAttr(svg, 'width');
		const height = getAttr(svg, 'height');

		svg.addAttr({
			name: 'viewBox',
			local: 'viewBox',
			value: '0 0 ' + width + ' ' + height,
			prefix: ''
		});
	}

	return svg;
};

async function getFiles(dir) {
	const dirents = await readdir(dir, { withFileTypes: true });
	const files = await Promise.all(
		dirents.map(dirent => {
			const res = resolve(dir, dirent.name);
			return dirent.isDirectory() ? getFiles(res) : res;
		})
	);

	return [].concat(...files);
}

module.exports = async args => {
	const { input, svgoFile } = args;

	let svgoConfig;

	try {
		svgoConfig = readFileSync(resolve(svgoFile));
	} catch (e) {
		console.warn('Invalid or missing SVGO config file! Using default.');

		svgoConfig = readFileSync(resolve(__dirname, 'svgo.yml'));
	}

	const { plugins } = yaml.safeLoad(svgoConfig);

	const svgo = new SVGO({
		plugins: [
			...plugins.map(plugin => ({
				[plugin]: true
			})),
			{
				cleanupIDs: {
					prefix: {
						toString: () => `id-${counter++}`
					}
				}
			},
			{
				custom: {
					type: 'perItem',
					active: true,
					// prettier-ignore
					description: 'Plugin which adds viewBox based on width and height',
					params: {},
					fn: addViewBox
				}
			}
		]
	});

	const folder = resolve(input);
	const files = await getFiles(folder);
	const paths = files.filter(file => file.endsWith('.svg'));

	for (const path of paths) {
		const data = await readFile(path, 'utf-8');
		const result = await svgo.optimize(data, { path });

		await writeFile(result.path, result.data);
	}
};
