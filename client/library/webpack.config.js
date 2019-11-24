var Dotenv = require('dotenv-webpack');
var path = require('path');

module.exports = (env) => ({
	entry: './ospeech.js',
	output: {
		filename: 'ospeech.min.js',
		path: path.resolve(__dirname, 'dist'),
		library: 'OSpeech',
		libraryTarget: 'window',
		libraryExport: 'default'
	},
	plugins : [
		new Dotenv({
			path: `./.env.${env.production ? "prod" : "dev"}`,
		})
	],
	module: {}
});