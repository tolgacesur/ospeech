const path = require('path');

module.exports = {
	entry: './ospeech.js',
	output: {
		filename: 'ospeech.min.js',
		path: path.resolve(__dirname, 'dist'),
		library: 'OSpeech',
		libraryTarget: 'window',
		libraryExport: 'default'
	},
	module: {}
};