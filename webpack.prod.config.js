const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: {
		content: ['./app/scripts/content.ts'],
		background: './app/scripts/background.ts'
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
			{ from: 'app/pages', to: ''}
		]),
		new MiniCssExtractPlugin({
			filename: 'styles/[name].css',
			chunkFilename: '[id].css',
		}),
		new webpack.optimize.AggressiveMergingPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
	],
	optimization: {
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					output: {
						comments: false,
					},
				},
			}),
		],
	},

	module: {
		rules: [
			{
				test: /.(ts|tsx)?$/,
				loader: 'ts-loader',
				include: [path.resolve(__dirname, 'src')],
				exclude: [/node_modules/]
			},
			{
				test: /\.scss$/,
				include: [path.resolve(__dirname, 'app')],
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
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
		extensions: ['.tsx', '.ts', '.js'],
		alias: {
			"sortablejs": "sortablejs/Sortable.js",
			modules: path.join(__dirname, "node_modules"),
		}
	},
};
