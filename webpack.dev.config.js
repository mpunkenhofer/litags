const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtensionReloader = require('webpack-chrome-extension-reloader');

module.exports = {
	mode: 'development',
	devtool: 'inline-source-map',

	entry: {
		content: './app/scripts/content.ts',
		background: './app/scripts/background.ts',
	},

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
	},

	plugins: [
		new webpack.ProgressPlugin(),
		new CopyPlugin([
			{ from: 'app/images', to: 'assets' },
			{ from: 'app/manifest.json', to: 'manifest.json' },
			{ from: 'app/_locales', to: '_locales'},
			{ from: 'app/pages', to: ''},
		]),
		new MiniCssExtractPlugin({
			filename: 'styles.css',
			chunkFilename: '[id].css',
		}),
		new ExtensionReloader({
			reloadPage: true, // Force the reload of the page also
			entries: { // The entries used for the content/background scripts
				contentScript: 'content',
				background: 'background',
			}
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
				use: [MiniCssExtractPlugin.loader, 'fast-css-loader', 'fast-sass-loader'],
			},
			{
				test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'assets/'
						}
					}
				]
			},
		]
	},

	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.scss'],
		alias: {
			"sortablejs": "sortablejs/Sortable.js",
			modules: path.join(__dirname, "node_modules"),
		}
	}
};
