//webpack.config.js
const path = require("path");

module.exports = {
	mode: "development",
	devtool: "inline-source-map",
	entry: {
		main: "./src/main.tsx",
	},
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "bundle.js", // <--- Will be compiled to this single file
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
				},
			},
		],
	},
};
