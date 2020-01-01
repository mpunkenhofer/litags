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
            './stylesheets/content.scss',
		],
        background: './source/background.ts',
        options: [
            './source/options/options.ts',
            './stylesheets/options/options.scss',
        ],
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },

    plugins: [
        new webpack.ProgressPlugin(),
        new CopyPlugin([
            {from: 'images/litags_icon*', to: 'assets/[name].[ext]'},
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
        extensions: ['.ts', '.tsx', '.js', '.scss'],
        alias: {
            "sortablejs": "sortablejs/Sortable.js",
            "webextension-polyfill": "webextension-polyfill/dist/browser-polyfill.js",
            modules: path.join(__dirname, "node_modules"),
        }
    },

    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
};
