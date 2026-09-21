const path = require("path");
const webpack = require("webpack");

module.exports = (_, argv) => {
	const isProd = argv.mode === "production";
	return {
		mode: isProd ? "production" : "development",
		devtool: isProd ? "source-map" : "inline-source-map",
		entry: {
			main: "./src/main.tsx",
		},
		output: {
			path: path.resolve(__dirname, "./dist"),
			filename: "bundle.js",
			clean: true,
		},
		resolve: {
			extensions: [".ts", ".tsx", ".js"],
			alias: {
				src: path.resolve(__dirname, "src"),
			},
			modules: [path.resolve(__dirname, "src"), "node_modules"],
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					loader: "ts-loader",
					options: {
						transpileOnly: true,
						onlyCompileBundledFiles: true,
						configFile: "tsconfig.webpack.json",
					},
				},
			],
		},
		optimization: {
			usedExports: true,
			sideEffects: true,
			minimize: isProd,
			moduleIds: "deterministic",
			chunkIds: "deterministic",
			splitChunks: false,
			runtimeChunk: false,
		},
		plugins: [
			new webpack.DefinePlugin({
				"process.env.NODE_ENV": JSON.stringify(
					isProd ? "production" : "development",
				),
			}),
		],
		cache: {
			type: "filesystem",
		},
	};
};
