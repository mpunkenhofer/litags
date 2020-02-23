const pkg = require('./package.json');
const path = require('path');
const baseManifest = require('./public/manifest/base');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const WebpackExtensionManifestPlugin = require('webpack-extension-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin');
const ExtensionReloader = require('webpack-chrome-extension-reloader');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',

    entry: {
        content: [
        	'./src/content.tsx',
            './src/content.scss',
		],
        background: './src/background.ts',
        options: [
            './src/options.tsx',
            './src/options.scss',
        ],
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },

    plugins: [
        new webpack.ProgressPlugin(),
        new CopyPlugin([
            {from: 'public/images/litags_icon*', to: 'assets/[name].[ext]'},
            {from: 'public/images/litags.svg', to: 'assets/[name].[ext]'},
            {from: 'public/images/github.svg', to: 'assets/[name].[ext]'},
            {from: 'public/images/discord.svg', to: 'assets/[name].[ext]'},
            {from: 'public/images/paypal.svg', to: 'assets/[name].[ext]'},
            {from: 'locales', to: '_locales/[name]/messages.json'},
            {from: 'public/*.html', to: '[name].[ext]'},
        ]),
        new WebpackExtensionManifestPlugin({
            config: {
                base: baseManifest,
                extend: {
                    version: pkg.version,
                    homepage_url: pkg.homepage
                }
            }
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new IgnoreEmitPlugin('styles.js'),
        new ExtensionReloader({
            reloadPage: false, // Force the reload of the page also
            entries: { // The entries used for the content/background scripts
                contentScript: 'content', // Use the entry names, not the file name or the path
                background: 'background' // *REQUIRED
            }
        }),
    ],

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
                include: [path.resolve(__dirname, 'src')],
                //exclude: [/node_modules/],
                use: [MiniCssExtractPlugin.loader, 'fast-css-loader', 'fast-sass-loader'],
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                include: [path.resolve(__dirname, 'public/fonts')],
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
        extensions: ['.ts', '.tsx', '.js', '.scss'],
    },
};
