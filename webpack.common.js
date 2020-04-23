const path = require( 'path');

const IgnoreEmitPlugin = require( 'ignore-emit-webpack-plugin');
const CopyWebpackPlugin = require( 'copy-webpack-plugin');
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require( 'fork-ts-checker-webpack-plugin');

module.exports = {
	entry: {
		content: ['./src/content/content.tsx', './src/content/content.scss'],
		background: ['./src/background/background.ts'],
		options: ['./src/options/options.tsx', './src/options/options.scss'],
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							compilerOptions: {
								// Enables ModuleConcatenation. It must be in here to avoid conflict with ts-node
								module: 'es2015'
							},

							// Make compilation faster with `fork-ts-checker-webpack-plugin`
							transpileOnly: true
						}
					}
				],
				exclude: /node_modules/
			}
		]
	},
	plugins: [
		new ForkTsCheckerWebpackPlugin(),
		new CopyWebpackPlugin([
			{
				from: 'assets',
				ignore: ['promo/*'],
				to: 'assets'
			},
			{
				from: 'src/*/*.html',
				to: '[name].[ext]'
			},
			{
				from: 'locales', 
				to: '_locales/[name]/messages.json'
			},
		]),
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
		new IgnoreEmitPlugin([/\/style.js$/, /\/*.LICENSE$/]),
	],
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.scss'],
	}
};