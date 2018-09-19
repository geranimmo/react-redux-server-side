const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const ENV = process.env.NODE_ENV || 'development';
const CSS_MAPS = ENV!=='production';

const config = {
	context: path.resolve(__dirname, "src"),
	entry: { main: './index.jsx' },
	output: {
		publicPath: '/',
		path: path.resolve(__dirname, 'dist'),
		filename: '[id].[hash].js',
		chunkFilename: "[id].[hash].js"
	},
	resolve: {
		extensions: ['.jsx', '.js', '.json', '.less'],
		modules: [
			path.resolve(__dirname, "node_modules"),
			'node_modules'
		],
		alias: {
			components: path.resolve(__dirname, "src/components"),    // used for tests
			style: path.resolve(__dirname, "src/style")
		}
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: "babel-loader"
			}, {
				test: /\.js$/,
				exclude: /node_modules/,
				use: "babel-loader"
			}, {
				test: /\.(less|css)$/,
				use: [
				   'style-loader',
				   MiniCssExtractPlugin.loader,
				   'css-loader',
				   'less-loader'
				]
			  }, {
				test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
				use: [ { loader: "url-loader?limit=10000&mimetype=application/font-woff" } ]
			}, {
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				use: [ { loader: "url-loader?limit=10000&mimetype=application/octet-stream" } ]
			}, {
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				use: [ { loader: "file-loader" } ]
			}, {
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				use: [ { loader: "url-loader?limit=10000&mimetype=image/svg+xml" } ]
			}, {
				test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
				use: 'file-loader'
			}, {
				test: /\.(xml|html|txt|md)$/,
				use: 'raw-loader'
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin('dist', {} ),
		new MiniCssExtractPlugin({
			filename: CSS_MAPS ? '[name].css' : '[name].[hash].css',
      		chunkFilename: CSS_MAPS ? '[id].css' : '[id].[hash].css'
		}),
		new HtmlWebpackPlugin({
			inject: false,
			hash: true,
			template: './index.ejs',
			filename: 'index.html',
			minify: { collapseWhitespace: true }
		}),
		new WebpackMd5Hash(),
		new CopyWebpackPlugin([
			{ from: './favicon.ico', to: './' },
			{ from: './manifest.json', to: './' },
			{ from: './robots.txt', to: './' },
			{ from: './assets/*/*.*', to: './assets', toType: 'dir' },
			{ from: './assets/*.*', to: './assets', toType: 'dir' }
		]),
		new SWPrecacheWebpackPlugin({
			staticFileGlobs: [
				'dist/assets/*/*.*',
				'dist/*.css',
				'dist/*.html'
			],
			stripPrefix: 'dist',
			minify: true
		})
	],
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		host: process.env.HOST,
		port: process.env.PORT,
		contentBase: path.resolve(__dirname, "src"),
		publicPath: '/',
		historyApiFallback: true,
		open: true
	}
};

module.exports = config;