const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'), //相对路径
    output: {
        path: path.resolve(__dirname, 'build'), //打包文件的输出路径
        filename: 'bundle.js' //打包文件名
    },
    devtool: 'inline-source-map', 
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@styles': path.resolve(__dirname, 'src/styles'),
            '@static': path.resolve(__dirname, 'src/static'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@server': path.resolve(__dirname, 'src/server')
        }
    },
    devServer: {
        contentBase: path.resolve(__dirname, './src'),
        host :'127.0.0.1',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
    },
    performance: {
        hints:false   
    },
    module: {
    	rules: [{
    		test: /\.(js|jsx)$/,
    		exclude: /node_modules/,
    		use: {
    			loader: 'babel-loader',
    			// options: { 
                //     presets: ['@babel/preset-env', '@babel/react'],
                // }
    		}
    	},
    	{
	        test: /\.(css|less)$/,
            use: [{
                loader: 'style-loader',
                }, {
                loader: 'css-loader', // translates CSS into CommonJS
                }, {
                loader: 'less-loader', // compiles Less to CSS
                options: {
                  modifyVars: {
                    // 'primary-color': '#1DA57A',
                  },
                  javascriptEnabled: true,
                },
            }]
	    }]
    },
    stats: { children: false },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            fileName: 'index.html',
            inject: true
        }),
        new copyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, 'src/static'),
                to:'static'
            }]
        })
    ]
}