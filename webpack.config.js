const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }, {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __isBrowser__: 'true'
        })
    ],
    output: {
        filename: './bundle.js',
        path: path.resolve(__dirname, 'public')
    }
};