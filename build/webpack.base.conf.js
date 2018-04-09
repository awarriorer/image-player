var path = require('path');
var webpack = require('webpack');

var config = {
	entry: {
		index: '.src/main.js'
	},
	output: {
		// path: path.join(__dirname, 'dist'),
		path: '/dist',
        filename: '[name].min.js',
        chunkFilename: '[name].[chunkhash].min.js',
	},
	plugins: [],
	watch: true,

	module: {
		rules: [
			{
				test: /\.(js)$/,
				exclude: /(node_modules)/,
				use: [
					{
						loader: 'eslint-loader'
					},
					{
						loader: 'babel-loader?cacheDirectory'
					}
				]
			}
		]
	}

};

module.exports = config;