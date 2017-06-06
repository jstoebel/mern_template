let ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  entry: {
    js: './src/client.js',
    css: './src/css/main.scss',
  },

  output: {
    filename: './public/build/[name]/bundle.js',
    publicPath: '',
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
  ],
};
