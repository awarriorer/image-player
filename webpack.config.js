var ora = require('ora')
var chalk = require('chalk')
var path = require('path');
var webpack = require('webpack');
var TransferWebpackPlugin = require('transfer-webpack-plugin');

// var spinner = ora('building for production...')
// spinner.start()

var config = {
	entry: {
		index: './src/core/index.js'
	},
	output: {
		path: path.join(__dirname, 'dist'),
        filename: '[name].min.js',
        chunkFilename: '[name].[chunkhash].min.js',
        library: 'ImagePlayer',
        libraryTarget: 'umd',
	},
	plugins: [
		//把指定文件夹下的文件复制到指定的目录
	    new TransferWebpackPlugin([
	        {
	            from: './demo',
	            to: './demo'
	        }
	    ], path.resolve(__dirname,"./")),
	],
	watch: true,
	module: {
		rules: [
			{
				test: /\.(js)$/,
				exclude: /(node_modules)|log\.js/,
				use: [
					// {
					// 	loader: 'eslint-loader',
					// },
					{
						loader: 'babel-loader?cacheDirectory'
					}
				]
			}
		]
	},

	devtool: "inline-source-map",

	resolve: {
		//modules,搜索路径
    	modules:[
    		path.join(__dirname, "./node_modules"),
            path.join(__dirname, "./src"),
    	],
    	// 默认名称后缀
    	extensions: ['.js','.vue'],
    	//默认文件名称
    	mainFiles: ["index"],
    	//别名
    	alias:{
            'cfg': path.resolve('./src/core/config.js'),
            'log': path.resolve('./src/util/log.js'),
            'util': path.resolve('./src/util/util.js'),
    	},
	},

	//配置服务器信息
    devServer: {
    	contentBase: "./dist/",//web服务器的根目录
        publicPath: "/",//编译后的文件存放位置

        historyApiFallback: true,
        //disableHostCheck: true,//不在检查host name,如果检查，那么通过nginx转发时可能直接报错
        hot: true,//自动刷新
        inline: true,//内联模式，该模式下修改代码后，webpack将自动打包并且刷新浏览器
        // progress: true,
        port: 3865, //端口
        watchOptions         : {
            aggregateTimeout : 300,
            poll             : 1000,
        },
    }

};

module.exports = config;

/*
	webpack(config, (err, stats) => {
    spinner.stop()

    if (err) {
    	throw err
    }

    process.stdout.write(stats.toString({
    	colors: true,
    	modules: false,
    	children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
    	chunks: false,
    	chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
    	console.log(chalk.red('  Build failed with errors.\n'))
    	process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))

  })
*/
