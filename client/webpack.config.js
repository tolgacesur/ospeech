const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'ospeech.js',
		path: path.resolve(__dirname, 'dist'),
		library: 'OSpeech',
		libraryTarget: 'window',
		libraryExport: 'default'
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
		]
	}
};