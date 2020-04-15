const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WebpackExtensionManifestPlugin = require('webpack-extension-manifest-plugin');
const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin');
const manifest = require('./src/manifest');
const pkg = require('./package.json');

module.exports = env => {
	return {
		mode: 'production',

		entry: {
			content: [
				'./src/content/content.tsx',
				'./src/content/content.scss',
			],
			options: [
				'./src/options/options.tsx',
				'./src/options/options.scss',
			],
			background: './src/background/background.ts',
		},
	
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: '[name].js',
		},
	
		plugins: [
			new webpack.ProgressPlugin(),
			new CopyPlugin([
				{from: 'assets/images/litags_icon*', to: 'assets/images/[name].[ext]'},
				{from: 'assets/images/*.svg', to: 'assets/images/[name].[ext]'},
				{from: 'locales', to: '_locales/[name]/messages.json'},
				{from: 'assets/fonts/*.woff', to: 'assets/fonts/[name].[ext]'},
				{from: 'assets/fonts/*.woff2', to: 'assets/fonts/[name].[ext]'},
				{from: 'src/options/options.html', to: '[name].[ext]'},
			]),
			new WebpackExtensionManifestPlugin({
				config: {
					base: manifest,
					extend: {
						version: pkg.version,
						homepage_url: pkg.homepage
					}
				}
			}),
			new MiniCssExtractPlugin({
				filename: '[name].css',
			}),
			new IgnoreEmitPlugin([/\/style.js$/, /\/*.LICENSE$/]),
			new webpack.optimize.AggressiveMergingPlugin(),
			new webpack.optimize.OccurrenceOrderPlugin(),
			...(env && env.zip && new ZipPlugin({
				path: 'zip',
				filename: `${pkg.name}-v${pkg.version}`,
			}) || []),
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
					test: /\.ts(x?)$/,
					loader: 'ts-loader',
					include: [path.resolve(__dirname, 'src')],
					exclude: [/node_modules/]
				},
				{
					test: /\.scss$/,
					include: [path.resolve(__dirname)],
					use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
				},
			]
		},

		resolve: {
			extensions: ['.ts', '.tsx', '.js', '.scss'],
		},
	};
};
