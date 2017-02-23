const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:3000',
        `webpack/hot/only-dev-server`,
        `${__dirname}/src/app.js`
    ],
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js?/,
                exclude: /node_modules/,
                loaders: ['babel-loader', 'eslint-loader']
            },
            {
                test: /\.scss$/,
                loader: 'style!css-loader!sass-loader'
            }
        ]
    },
    eslint: {
        configFile: './.eslintrc'
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: `${__dirname}/src/index.tmpl.html`
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};
