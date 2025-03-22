const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); //to access built-in plugins
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },

 module: {
      rules: [
            // {
            //     test: /\.css$/i,
            //     use: ['style-loader', 'css-loader'],
            // },
        {
          test: /\.[tj]s$/,
          use: 'ts-loader',
          exclude: /node_modules/,
     },
                {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
      },
        ],
  },
  resolve: {
    extensions: ['.ts', '.js'], //позволяет не указывать расширение в импортах
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new CopyPlugin({patterns: [{ from: "./src/assets", to: "./assets" }]}),
  ],
};