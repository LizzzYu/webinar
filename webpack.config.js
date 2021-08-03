/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const sass = require('sass');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SRC_PATH = path.resolve(__dirname, 'src');
const NODE_MODULES_PATH = path.resolve(__dirname, '..', 'node_modules');

module.exports = {
	mode: 'development',
	devtool: 'inline-source-map',
	entry: {
		app: [path.resolve(SRC_PATH, 'index.tsx')],
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 9000,
		// proxy: {
		// 	'/v1': {
		// 		target: 'https://api.finlogix.com',
		// 		secure: false,
		// 	},
		// },
		// proxy: {
		// 	'https://api.finlogix.com': {
		// 		target: 'http://localhost:9000',
		// 		secure: false,
		// 	},
		// },
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
			},
			{
				test: /\.(css|s[ac]ss)$/,
				include: [SRC_PATH],
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: {
								localIdentName: '[path][name]__[local]',
							},
						},
					},
					'postcss-loader',
					{
						loader: 'sass-loader',
						options: {
							implementation: sass, // 強制使用 dart-sass (而不是 node-sass)
						},
					},
				],
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
				include: [NODE_MODULES_PATH],
				exclude: [SRC_PATH],
			},
			{
				test: /\.(jpe?g|png|gif|svg|mp4|mjpeg|zip)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							hash: 'sha512',
							digest: 'hex',
							name: '[hash].[ext]',
						},
					},
				],
				include: [SRC_PATH],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:7].css',
			chunkFilename: 'css/[id].[contenthash:7].css',
		}),
	],
};
