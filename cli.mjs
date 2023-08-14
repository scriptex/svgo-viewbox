#!/usr/bin/env node

import meow from 'meow';
import svgoViewBox from './index.mjs';

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
		importMeta: import.meta,
		flags: {
			input: {
				type: 'string',
				shortFlag: 'i'
			},
			svgoFile: {
				type: 'string',
				shortFlag: 'f'
			}
		}
	}
);

svgoViewBox(cli.flags, cli.input);
