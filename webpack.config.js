/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

console.log(
  `Running webpack in the ${isProduction ? 'production' : 'development'} mode`,
);

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public', 'build'),
    filename: isProduction ? 'bundle.[chunkhash].js' : 'bundle.js',
    publicPath: '/build/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        // Babel options are loaded from .babelrc
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
        options: {
          // Inline files smaller than 10 kB (10240 bytes)
          limit: 10 * 1024,
          // Remove the quotes from the url (they’re unnecessary in our case)
          noquotes: true,
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'image-webpack-loader',
        // This will apply the loader before the other ones
        enforce: 'pre',
      },
    ],
  },
  devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
  plugins: [
    // Emit HTML files that serve the app
    new HtmlWebpackPlugin({
      template: 'src/templates/landing.html',
      filename: path.resolve(__dirname, 'public/index.html'),
      alwaysWriteToDisk: true,
    }),
    new HtmlWebpackPlugin({
      template: 'src/templates/app.html',
      filename: path.resolve(__dirname, 'public/users/index.html'),
      alwaysWriteToDisk: true,
    }),
  ].concat(
    isProduction
      ? [
          // Minimize the app code
          new webpack.optimize.UglifyJsPlugin(),
          // Replace `process.env.NODE_ENV` with `"production"`
          new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"',
          }),
          // Remove all Moment.js’ locales expect the English one
          new MomentLocalesPlugin(),
          // Concatenate modules where possible
          new webpack.optimize.ModuleConcatenationPlugin(),
        ]
      : [
          // Force writing the HTML files to disk when running in the development mode
          // (otherwise, webpack-dev-server won’t serve the app)
          new HtmlWebpackHarddiskPlugin(),
        ],
  ),
  devServer: {
    contentBase: path.join(__dirname, 'public'),
  },
};
