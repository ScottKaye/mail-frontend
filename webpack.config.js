var webpack = require("webpack");
var closure = require("webpack-closure-compiler");

module.exports = {
	entry: "./client.js",
	output: {
		path: __dirname + "/static/js/",
		filename: "bundle.js"
	},
	plugins: [
/*		new webpack.DefinePlugin({
			"process.env":{
				"NODE_ENV": JSON.stringify("production")
			}
		}),
		new closure({
			compiler: {
				language_in: "ECMASCRIPT6",
				language_out: "ECMASCRIPT5",
				compilation_level: "SIMPLE_OPTIMIZATIONS"
			},
			concurrency: 3
		})*/
	],
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules)/,
				loader: "babel",
				query: {
					cacheDirectory: true,
					presets: ["react", "es2015", "stage-0"]
				}
			},
			{
				test: /\.json$/,
				loader: "json-loader"
			}
		]
	},
	/*externals: [{
		"node-rsa": true
	}],*/
	resolve: {
		extensions: ["", ".js", ".jsx"],
		alias: {
			// "react": "react-lite",
			// "react-dom": "react-lite"
		}
	},
	node: {
		"fs": "empty",
		"child_process": "empty"
	}
};
