module.exports = {
	plugins: [
		'removeDoctype',
		'removeXMLProcInst',
		'removeComments',
		'removeMetadata',
		'removeEditorsNSData',
		'cleanupAttrs',
		'mergeStyles',
		'inlineStyles',
		'minifyStyles',
		{
			name: 'cleanupIDs',
			active: true,
			params: {
				prefix: {
					toString() {
						this.counter = this.counter || 0;

						return `svgo-viewbox-id-${this.counter++}`;
					}
				}
			}
		},
		'removeUselessDefs',
		'removeUnknownsAndDefaults',
		'removeUselessStrokeAndFill',
		'cleanupEnableBackground',
		'removeEmptyText',
		'removeEmptyAttrs',
		'convertStyleToAttrs',
		'removeEmptyContainers',
		'removeDimensions'
	]
};
