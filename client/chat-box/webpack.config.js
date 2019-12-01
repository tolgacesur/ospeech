var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var Dotenv = require('dotenv-webpack');
var path = require('path');

module.exports = (env) => ({
	entry: './chat-box.js',
	output: {
		filename: 'chat-box.js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Chat Box',
			filename: 'chat-box.html',
			template: './chat-box.html'
		}),
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// all options are optional
			filename: 'chat-box.css',
			chunkFilename: '[id].css',
			ignoreOrder: false, // Enable to remove warnings about conflicting order
		}),
		new Dotenv({
			path: `./.env.${process.env.NODE_ENV === 'development' ? "dev" : "prod"}`,
		})
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
				{
					loader: MiniCssExtractPlugin.loader,
					options: {
					// you can specify a publicPath here
					// by default it uses publicPath in webpackOptions.output
					// publicPath: '../',
					hmr: process.env.NODE_ENV === 'development',
					},
				},
				'css-loader',
				],
			},
		],
	}
});