const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const ChromeExtensionReloader  = require('webpack-chrome-extension-reloader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	mode: 'development',
	devtool: 'inline-source-map',

	entry: {
		content: ['./app/scripts/content.ts'],
		background: './app/scripts/background.ts',
	},

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
	},

	plugins: [
		new ChromeExtensionReloader({
			reloadPage: true, // Force the reload of the page also
			entries: { // The entries used for the content/background scripts
				contentScript: 'content', // Use the entry names, not the file name or the path
				background: 'background' // *REQUIRED
			}
		}),
		new webpack.ProgressPlugin(),
		new CopyPlugin([
			{ from: 'app/images', to: 'assets' },
			{ from: 'app/manifest.json', to: 'manifest.json' },
			{ from: 'app/_locales', to: '_locales'},
			{ from: 'app/pages', to: ''}
		]),
		new MiniCssExtractPlugin({
			filename: 'styles/[name].css',
			chunkFilename: '[id].css',
		}),
	],

	module: {
		rules: [
			{
				test: /.(ts|tsx)?$/,
				loader: 'ts-loader',
				include: [path.resolve(__dirname, 'app')],
				exclude: [/node_modules/]
			},
			{
				test: /\.scss$/,
				include: [path.resolve(__dirname, 'app')],
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
		]
	},

	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.scss']
	}
};