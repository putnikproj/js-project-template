const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    entry: './src/index.js',
    devtool: isProd ? false : 'eval-cheap-module-source-map',
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: isProd ? 'js/[name].[contenthash:6].bundle.js' : 'js/[name].bundle.js',
      publicPath: '',
      clean: isProd
    },
    target: isProd ? 'browserslist' : 'web',
    devServer: {
      contentBase: path.resolve(__dirname, 'src/html'),
      watchContentBase: true,
      compress: true,
      hot: !isProd,
      overlay: !isProd
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/html/index.html',
        scriptLoading: 'blocking'
      }),
      ...isProd
        ? [new MiniCssExtractPlugin({
          filename: isProd ? 'css/[name].[contenthash:6].bundle.css' : 'css/[name].bundle.css'
        })]
        : []
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          use: [
            isProd ? {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../'
              }
            } : 'style-loader',
            'css-loader',
            ...isProd ? ['postcss-loader'] : []
          ]
        },
        {
          test: /\.html$/,
          loader: 'html-loader'
        },
        {
          test: /\.(png|jpe?g|gif|svg|webp)$/,
          type: 'asset/resource',
          generator: {
            filename: isProd ? 'img/[name].[contenthash:6][ext]' : 'img/[name][ext]'
          }
        },
        {
          test: /\.(woff2?)$/,
          type: 'asset/resource',
          generator: {
            filename: isProd ? 'fonts/[name].[contenthash:6][ext]' : 'fonts/[name][ext]'
          }
        },
        {
          test: /favicon\.ico$/,
          type: 'asset/resource',
          generator: {
            filename: '[name][ext]'
          }
        }
      ]
    }
  };
};
