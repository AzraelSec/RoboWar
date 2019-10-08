const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src/js/main.ts'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.ts$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
        }]
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    mode: 'development',
};