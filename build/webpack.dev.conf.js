var path = require("path");
var webpack = require("webpack");

const config = {
	entry: {
		index: ".src/main.js"
	},
	output: {
		path: path.join(__dirname, "dist"),//路径, // 输出文件的保存路径
        filename: "[name].min.js",
        chunkFilename: "[name].[chunkhash].min.js",
	}
};