/**
 * @typedef {Array<import('svgo').PluginConfig>} SVGOPlugins
 */

export default {
	/**
	 * @type {SVGOPlugins}
	 */
	plugins: [
		{
			name: 'preset-default',
			params: {
				overrides: {
					removeViewBox: false
				}
			}
		}
	]
};
