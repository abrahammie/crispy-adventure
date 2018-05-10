const path = require('path');
const webpack = require('webpack');


module.exports = {
  entry: './client/src/main.jsx',
  output: {
    path: path.resolve(__dirname, 'client/dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.jsx'],
  },
  module: {
    rules: [
     {
      test: /\.jsx?$/,
      include: [
        path.resolve(__dirname, 'client/src'),
      ],
      exclude: [
        path.resolve(__dirname, 'client/dist'),
      ],
      loader: "babel-loader",
      options: {
        presets: ['react', 'env'],
      },
     },
    ],
  },
  resolve: {
    modules: [
      'node_modules',
    ],
  },
  mode: 'none',
};
