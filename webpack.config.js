var webpack = require("webpack");

module.exports = {
	entry: "./client.js",
	output: {
		path: __dirname + "/static/js/",
		filename: "bundle.js"
	},
	plugins: [
		/*new webpack.optimize.UglifyJsPlugin({
			mangle: {
				except: ["exports"]
			},
			compress: {
				warnings: false
			},
			comments: false
		}),*/
	],
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules)/,
				loader: "babel",
				query: {
					presets: ["react", "es2015", "stage-0"]
				}
			},
			{
				test: /\.json$/,
				loader: "json-loader"
			}
		]
	},
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
