var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

module.exports = {
    entry: {
        app: [
            path.join(__dirname, './app/client')
        ]
    },

    node: {
      __dirname: true,
    },

    output: {
        path: path.join(__dirname, './build'),
        filename: '[name].bundle.js'
    },

    module: {     

        preLoaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['eslint']
            }
        ],

        loaders: [
            { test: /^jquery\/src/, loader: 'amd-define-factory-patcher-loader' },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css-loader')
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style', 'css-loader!less-loader')
            },            
            {test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.html$/, 
                loader: 'raw'  
            }

            // ngannataite 
        ]
    },

    eslint: {
        configFile: './.eslintrc'
    },

    resolve: {        
        alias: {
            '$': 'jquery/src/jquery.js',
            'jquery': 'jquery/src/jquery.js'
        },
        extensions: ['', '.js', '.json'],
        modulesDirectories: ['node_modules', 'app']
    },

    plugins: [
        // new webpack.ProvidePlugin({
        //     'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        //   }),
        new ExtractTextPlugin('[name].bundle.css'),
        new webpack.DefinePlugin({ "global.GENTLY": false }),
        new webpack.NoErrorsPlugin(),
        new ngAnnotatePlugin({
            add: true
        })
    ]

};
