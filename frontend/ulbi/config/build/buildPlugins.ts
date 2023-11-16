import webpack from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/config';
import ReactRefreshWebpackPlugin  from '@pmmmwh/react-refresh-webpack-plugin';

export function buildPlugins({
	path,
}: BuildOptions): webpack.WebpackPluginInstance[] {
	return [
		new HTMLWebpackPlugin({
			template: path.html,
		}),
		new webpack.ProgressPlugin(),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:8].css',
			chunkFilename: 'css/[name].[contenthash:8].css',
		}),
		new webpack.HotModuleReplacementPlugin(),
		new ReactRefreshWebpackPlugin()
	];
}
