let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');

process.traceDeprecation = true; // when something is deprecated, tell me where.

module.exports = {

  entry: {
    js: './src/client.js',
    css: './src/css/main.scss',
  },

  output: {
    filename: '[name]-bundle-[hash:6].js',
    publicPath: 'build',
    path: __dirname + '/public/build',
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-2'],
        },
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'}),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({filename: './public/build/[name]/main.css', disable: false, allChunks: true}),
    new HtmlWebpackPlugin({
      filename: `${__dirname}/public/build/index.html`,
      template: `${__dirname}/src/index.html`,
    }),
  ],
};
