var path = require('path'),
    webpack = require('webpack');

module.exports = {
    entry: [
        './src/main.js',
    ],
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                include: path.join(__dirname, 'src'),
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
    debug: true
};
