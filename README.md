[![GitHub release](https://img.shields.io/github/release/scriptex/svgo-viewbox.svg)](https://github.com/scriptex/svgo-viewbox/releases/latest)
[![GitHub issues](https://img.shields.io/github/issues/scriptex/svgo-viewbox.svg)](https://github.com/scriptex/svgo-viewbox/issues)
[![GitHub last commit](https://img.shields.io/github/last-commit/scriptex/svgo-viewbox.svg)](https://github.com/scriptex/svgo-viewbox/commits/master)
[![Build Status](https://travis-ci.com/scriptex/svgo-viewbox.svg?branch=master)](https://travis-ci.com/scriptex/svgo-viewbox)
[![npm](https://img.shields.io/npm/dt/svgo-viewbox.svg)](https://www.npmjs.com/package/svgo-viewbox)
[![npm](https://img.shields.io/npm/v/svgo-viewbox.svg)](https://www.npmjs.com/package/svgo-viewbox)
[![Analytics](https://ga-beacon-361907.ew.r.appspot.com/UA-83446952-1/github.com/scriptex/svgo-viewbox/README.md)](https://github.com/scriptex/svgo-viewbox/)

# svgo-viewBox

> Add `viewBox` to SVG files using SVGO

Node JS script which uses SVGO and a custom plugin in order to add `viewBox` attribute to all SVG files in a folder.

## Dependencies

1. NodeJS
2. NPM or Yarn
3. SVGO installed and configured - you should have a `svgo.config.js` file. If you don't, the default config file will be used.
4. Some SVG files which have `width` and `height` attribute but lack the `viewBox` attribute.

## Usage

```sh
svgo-viewbox --help

#	Usage
#	  $ svgo-viewbox --arg1 --arg2
#
#	Options
#	  --input, -i		path to folder which contains SVG files
#	  --svgo-file, -f 	path to SVGO configuration file in JS format (https://github.com/svg/svgo#configuration)
#
#	Examples
#	  $ svgo-viewbox --input ./assets/images/svg --svgo-file ./svgo.config.js
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
		"svgo-viewbox": "svgo-viewbox -i ./assets/images/svg -f ./svgo.config.js"
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
svgo-viewbox -i ./assets/images/svg -f ./svgo.config.js
```

### Without installing

```sh
npx svgo-viewbox -i ./assets/images/svg -f ./svgo.config.js
```

## LICENSE

MIT

---

<div align="center">
    Connect with me:
</div>

<br />

<div align="center">
    <a href="https://atanas.info">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/logo.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="mailto:hi@atanas.info">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/email.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://www.linkedin.com/in/scriptex/">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/linkedin.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://github.com/scriptex">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/github.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://gitlab.com/scriptex">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/gitlab.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://twitter.com/scriptexbg">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/twitter.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://www.npmjs.com/~scriptex">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/npm.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://www.youtube.com/user/scriptex">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/youtube.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://stackoverflow.com/users/4140082/atanas-atanasov">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/stackoverflow.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://codepen.io/scriptex/">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/codepen.svg" width="20" alt="">
    </a>
    &nbsp;
    <a href="https://profile.codersrank.io/user/scriptex">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/codersrank.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://linktr.ee/scriptex">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/linktree.svg" height="20" alt="">
    </a>
</div>

---

<div align="center">
Support and sponsor my work:
<br />
<br />
<a href="https://twitter.com/intent/tweet?text=Checkout%20this%20awesome%20developer%20profile%3A&url=https%3A%2F%2Fgithub.com%2Fscriptex&via=scriptexbg&hashtags=software%2Cgithub%2Ccode%2Cawesome" title="Tweet">
	<img src="https://img.shields.io/badge/Tweet-Share_my_profile-blue.svg?logo=twitter&color=38A1F3" />
</a>
<a href="https://paypal.me/scriptex" title="Donate on Paypal">
	<img src="https://img.shields.io/badge/Donate-Support_me_on_PayPal-blue.svg?logo=paypal&color=222d65" />
</a>
<a href="https://revolut.me/scriptex" title="Donate on Revolut">
	<img src="https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/revolut.json" />
</a>
<a href="https://patreon.com/atanas" title="Become a Patron">
	<img src="https://img.shields.io/badge/Become_Patron-Support_me_on_Patreon-blue.svg?logo=patreon&color=e64413" />
</a>
<a href="https://ko-fi.com/scriptex" title="Buy Me A Coffee">
	<img src="https://img.shields.io/badge/Donate-Buy%20me%20a%20coffee-yellow.svg?logo=ko-fi" />
</a>
<a href="https://liberapay.com/scriptex/donate" title="Donate on Liberapay">
	<img src="https://img.shields.io/liberapay/receives/scriptex?label=Donate%20on%20Liberapay&logo=liberapay" />
</a>

<a href="https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/bitcoin.json" title="Donate Bitcoin">
	<img src="https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/bitcoin.json" />
</a>
<a href="https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/etherium.json" title="Donate Etherium">
	<img src="https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/etherium.json" />
</a>
<a href="https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/shiba-inu.json" title="Donate Shiba Inu">
	<img src="https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/shiba-inu.json" />
</a>
</div>
