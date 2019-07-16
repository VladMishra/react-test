const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const appConfig = require('./src/assets/Config.g.json');

const mode = (process || process.env.npm_lifecycle_script.match(/(?<=--mode\s+).+/) || [ 'production' ])[0];

module.exports = {
	mode,
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: `index${appConfig.version}.js`,
		publicPath: '/'
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'React Cources',
			inject: true,
			favicon: './src/favicon.png',
			template: './src/index.ejs'
		}),
		new ManifestPlugin({
			fileName: 'asset-manifest.json'
		}),
		new CopyWebpackPlugin([
			{
				from: './src/assets/',
				to: '',
				force: true,
				ignore: [ 'robots*.txt' ]
			}
		]),
		new CleanWebpackPlugin()
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: [ 'babel-loader' ],
				exclude: /node_modules/
			},
			{
				test: /\.(eot|otf|svg|ttf|woff|png)$/,
				use: {
					loader: 'file-loader',
					options: { name: 'assets/[name][hash].[ext]' }
				}
			}
		]
	},
	resolve: {
		alias: {
			components: path.resolve(__dirname, './src/components'),
			reducers: path.resolve(__dirname, './src/reducers'),
			containers: path.resolve(__dirname, './src/containers'),
			store: path.resolve(__dirname, './src/store'),
			assets: path.resolve(__dirname, './src/assets'),
			utils: path.resolve(__dirname, './src/utils'),
			selectors: path.resolve(__dirname, './src/selectors'),
			pages: path.resolve(__dirname, './src/pages'),
			middleware: path.resolve(__dirname, './src/middleware'),
			root: path.resolve(__dirname, './src'),
			config: path.resolve(__dirname, './src/config')
		}
	},
	devtool: mode === 'production' ? false : 'cheap-module-source-map',
	node: {
		dgram: 'empty',
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		child_process: 'empty'
	},
	devServer: {
		headers: { 'Access-Control-Allow-Origin': '*' },
		contentBase: false,
		historyApiFallback: true,
		host: '0.0.0.0',
		port: 1000,
		disableHostCheck: true,
		compress: true,
		inline: true,
		hot: false,
		stats: {
			assets: true,
			children: false,
			chunks: false,
			hash: false,
			modules: false,
			publicPath: false,
			timings: true,
			version: false,
			warnings: true,
			colors: { green: '\u001b[32m' }
		}
	}
};
