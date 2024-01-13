import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import webpack from 'webpack';
import dotenv from 'dotenv';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackTagsPlugin from 'html-webpack-tags-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'src'),
    },
    compress: true,
    port: 4000,
    open: true,
    hot: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-modules'],
          },
        },
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext]',
        },
      },
      {
        test: /\.tpl$/,
        use: 'raw-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'head',
      scriptLoading: 'defer',
    }),
    new MiniCssExtractPlugin({
      filename: 'compiled-css/[name].css',
    }),
    new HtmlWebpackTagsPlugin({
      links: ['compiled-css/main.css'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets',
          to: 'assets',
        },
        {
          from: 'src/views/**/*.tpl',
          to({ context, absoluteFilename }) {
            return path.relative(path.join(context, 'src'), absoluteFilename);
          },
        },
        {
          from: 'src/translations/*.json',
          to({ context, absoluteFilename }) {
            return path.relative(context, absoluteFilename);
          },
        },
        {
          from: 'src/compiled-css/**/*.css',
          to({ context, absoluteFilename }) {
            return path.relative(path.join(context, 'src'), absoluteFilename);
          },
        },
        
      ],
    }),
    
    
  ],
};
