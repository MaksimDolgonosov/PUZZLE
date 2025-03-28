const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack'); //to access built-in plugins
const CopyPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');

const devServer = (isDev) => {
  !isDev ? {} : {
    client: {
      open: true,
      hot: true,
      port: 8080,
    }

}}

const esLintPlugin = (isDev) => isDev ? [] : [new ESLintPlugin({ extensions: ['ts', 'js'] })];

module.exports = ({ develop }) => ({
  mode: develop ? "development" : "production",
  devtool: develop ? "inline-source-map" : "none",
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
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
        ],
  },
  resolve: {
    extensions: ['.ts', '.js'], //позволяет не указывать расширение в импортах
  },
  plugins: [
    ...esLintPlugin(develop),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new HtmlWebpackPlugin({ template: './src/pages/login.html',filename: 'login.html', }),
    new HtmlWebpackPlugin({ template: './src/pages/game.html', filename: 'game.html', }),
    new MiniCssExtractPlugin({ filename: 'style.css' }),
    new CopyPlugin({patterns: [{ from: "./src/assets", to: "./assets" }]}),
  ],
  devServer: devServer(develop)
});