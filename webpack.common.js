const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

module.exports = {
	devServer: {
		contentBase: path.resolve(__dirname, './src'),
		historyApiFallback: true,
	},
	entry: {
		options: path.resolve(__dirname, './src/pages/options/options.tsx'),
		app: path.resolve(__dirname, './src/app.tsx'),
		index: path.resolve(__dirname, './src/index.ts'),
		['app-injector']: path.resolve(__dirname, './src/app-injector.ts'),
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'plugin'),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								'@babel/preset-env',
								'@babel/preset-react',
								{
									plugins: ['@babel/plugin-proposal-class-properties'],
								},
							],
						},
					},
				],
			},
			{
				test: /\.html$/,
				use: ['html-loader'],
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
		plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'options.html',
			template: 'src/pages/options/options.html',
			chunks: ['options'],
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: 'src/manifest.json', to: '[name].[ext]' },
				{ from: 'src/assets/images/*.png', to: 'assets/images/[name].[ext]' },
			],
		}),
	],
};
