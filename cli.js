#!/usr/bin/env node

// @ts-nocheck

const meow = require('meow');
const svgoViewBox = require('.');

const cli = meow(
	`
	Usage
	  $ svgo-viewbox --arg1 --arg2

	Options
	  --input, -i		path to folder which contains SVG files
	  --svgo-file, -f 	path to SVGO configuration file in JS format (https://github.com/svg/svgo#configuration)

	Examples
	  $ svgo-viewbox --input ./assets/images/svg --svgo-file ./svgo.config.js
`,
	{
		flags: {
			input: {
				type: 'string',
				alias: 'i'
			},
			'svgo-file': {
				type: 'string',
				alias: 'f'
			}
		}
	}
);

svgoViewBox(cli.flags);
