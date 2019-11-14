const pkg = require('./package.json');
const path = require('path');
const baseManifest = require('./manifest/base');
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
        	'./source/content.ts',
            './stylesheets/font.scss',
            './stylesheets/layout.scss',
            './stylesheets/button.scss',
            './stylesheets/list.scss'
		],
        background: './source/background.ts',
        options: ['./source/options.ts', './stylesheets/options.scss'],
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },

    plugins: [
        new webpack.ProgressPlugin(),
        new CopyPlugin([
            {from: 'images/litags_*', to: 'assets/[name].[ext]'},
            {from: 'locales', to: '_locales/[name]/messages.json'},
            {from: 'html', to: ''},
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
            reloadPage: true, // Force the reload of the page also
        }),
    ],

    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                include: [path.resolve(__dirname, 'source')],
                exclude: [/node_modules/]
            },
            {
                test: /\.scss$/,
                include: [path.resolve(__dirname, 'stylesheets')],
                exclude: [/node_modules/],
                use: [MiniCssExtractPlugin.loader, 'fast-css-loader', 'fast-sass-loader'],
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                include: [path.resolve(__dirname, 'fonts')],
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
        extensions: ['.ts', '.js', '.scss'],
        alias: {
            "sortablejs": "sortablejs/Sortable.js",
            "webextension-polyfill": "webextension-polyfill/dist/browser-polyfill.js",
            modules: path.join(__dirname, "node_modules"),
        }
    }
};
