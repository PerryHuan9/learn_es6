const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode : 'none' ,
    entry : {
        // es2015:"./js/es2015.js",
        // arrows_this:"./js/1_arrows_this.js",
        // class9:"./js/9_class.js"
        // fun:"./js/12_function.js",
        // main: "./module/main.js",
        // main2:"./module/main2.js",
        // symbol:"./js/14_symbol.js"
        main : "./main" ,
    } ,
    devServer : {
        contentBase : './dist' ,
        hot : true ,

    } ,
    devtool : 'inline-source-map' ,
    output : {
        path : path.resolve(__dirname , 'dist') ,
        filename : "[name].bundle.js" ,
    } ,
    module : {
        rules : [
            {
                test : /\.js$/ ,
                use : [ "babel-loader" ]
            }
        ]
    } ,
    plugins : [

        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title:'学习ES6'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ]


};





















