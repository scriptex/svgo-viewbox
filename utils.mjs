import { resolve } from 'node:path';
import { promises, lstatSync } from 'node:fs';

const { readdir } = promises;

export async function getFiles(dir) {
	if (lstatSync(dir).isFile()) {
		return [dir].filter(file => file.endsWith('.svg'));
	}

	const dirents = await readdir(dir, { withFileTypes: true });
	const files = await Promise.all(
		dirents.map(dirent => {
			const res = resolve(dir, dirent.name);
			return dirent.isDirectory() ? getFiles(res) : res;
		})
	);

	// @ts-ignore
	return [].concat(...files).filter(file => file.endsWith('.svg'));
}

export async function getInputFiles(input) {
	return !input ? [] : await getFiles(resolve(input));
}

export async function getPathsFiles(paths) {
	if (paths.length === 0) {
		return [];
	}

	let result = [];

	for (const path of paths) {
		const files = await getInputFiles(path);

		result = [...result, ...files];
	}

	return result;
}
