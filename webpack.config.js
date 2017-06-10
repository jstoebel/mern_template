let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    js: './src/client.js',
    css: './src/css/main.scss',
  },

  output: {
    filename: './public/build/[name]/bundle-[hash:6].js',
    publicPath: '',
    path: __dirname,
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react',
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
