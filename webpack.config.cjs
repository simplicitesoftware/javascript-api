// eslint-disable-next-line @typescript-eslint/no-require-imports
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: './src/browser.js',
	output: {
		filename: 'simplicite.min.js'
	},
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin({
			terserOptions: {
				format: {
					comments: false,
				},
			},
			extractComments: false,
		})],
	},
	devtool: 'source-map'
};