[![GitHub release](https://img.shields.io/github/release/scriptex/svgo-viewbox.svg)](https://github.com/scriptex/svgo-viewbox/releases/latest)
[![GitHub issues](https://img.shields.io/github/issues/scriptex/svgo-viewbox.svg)](https://github.com/scriptex/svgo-viewbox/issues)
[![GitHub last commit](https://img.shields.io/github/last-commit/scriptex/svgo-viewbox.svg)](https://github.com/scriptex/svgo-viewbox/commits/master)
[![Build Status](https://travis-ci.com/scriptex/svgo-viewbox.svg?branch=master)](https://travis-ci.com/scriptex/svgo-viewbox)
[![npm](https://img.shields.io/npm/dt/svgo-viewbox.svg)](https://www.npmjs.com/package/svgo-viewbox)
[![npm](https://img.shields.io/npm/v/svgo-viewbox.svg)](https://www.npmjs.com/package/svgo-viewbox)
[![Analytics](https://ga-beacon.appspot.com/UA-83446952-1/github.com/scriptex/svgo-viewbox/README.md)](https://github.com/scriptex/svgo-viewbox/)

# svgo-viewBox

> Add `viewBox` to SVG files using SVGO

Node JS script which uses SVGO and a custom plugin in order to add `viewBox` attribute to all SVG files in a folder.

## Dependencies

1. NodeJS
2. NPM or Yarn
3. SVGO installed and configured - you should have an `svgo.yml` file. If you don't, the default config file will be used.
4. Some SVG files which have `width` and `height` attribute but lack the `viewBox` attribute.

## Usage

```sh
svgo-viewbox --help

#	Usage
#	  $ svgo-viewbox --arg1 --arg2
#
#	Options
#	  --input, -i		path to folder which contains SVG files
#	  --svgo-file, -f 	path to SVGO configuration file in YAML format
#
#	Examples
#	  $ svgo-viewbox --input ./assets/images/svg --svgo-file ./svgo.yml
#     $ svgo-viewbox --i ./assets/images/svg
```

### As an NPM script:

First install the module as a development dependency

```sh
npm i svgo-viewbox --save-dev

# or

yarn add svgo-viewbox -D
```

then add a new NPM script in your `package.json` file:

```json
{
	"scripts": {
		"svgo-viewbox": "svgo-viewbox -i ./assets/images/svg -f ./svgo.yml"
	}
}
```

### From the command line

First install the module globally

```sh
npm i -g svgo-viewbox

# or

yarn global add svgo-viewbox
```

then use it in your terminal

```sh
svgo-viewbox -i ./assets/images/svg -f ./svgo.yml
```

### Without installing

```sh
npx svgo-viewbox -i ./assets/images/svg -f ./svgo.yml
```

## Support this project

[![Tweet](https://img.shields.io/badge/Tweet-Share_this_repository-blue.svg?style=flat-square&logo=twitter&color=38A1F3)](https://twitter.com/intent/tweet?text=Checkout%20this%20awesome%20software%20project%3A&url=https%3A%2F%2Fgithub.com%2Fscriptex%2Fsvgo-viewbox&via=scriptexbg&hashtags=software%2Cgithub%2Ccode%2Cawesome)
[![Donate](https://img.shields.io/badge/Donate-Support_me_on_PayPal-blue.svg?style=flat-square&logo=paypal&color=222d65)](https://www.paypal.me/scriptex)
[![Become a Patron](https://img.shields.io/badge/Become_Patron-Support_me_on_Patreon-blue.svg?style=flat-square&logo=patreon&color=e64413)](https://www.patreon.com/atanas)
[![Buy Me A Coffee](https://img.shields.io/badge/Donate-Buy%20me%20a%20coffee-yellow.svg?logo=ko-fi)](https://ko-fi.com/scriptex)

## LICENSE

MIT
