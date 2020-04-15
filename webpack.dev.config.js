const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const WebpackExtensionManifestPlugin = require('webpack-extension-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin');
const ExtensionReloader = require('webpack-extension-reloader');

const manifest = require('./src/manifest');
const pkg = require('./package.json');

module.exports = {
    mode: 'development',
    watch: true,
    devtool: 'inline-source-map',

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
                    name: 'Litags - Dev Build',
                    version: pkg.version,
                    homepage_url: pkg.homepage
                }
            }
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new IgnoreEmitPlugin([/\/style.js$/, /\/*.LICENSE$/]),
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
                use: [MiniCssExtractPlugin.loader, 'fast-css-loader', 'fast-sass-loader'],
            },
        ]
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.scss'],
    },
};
