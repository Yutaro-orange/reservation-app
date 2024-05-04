const webpack = require('webpack');
const path = require('path');

/**
 * (S)CSS 用のローダー設定。
 */
const cssRules = {
  test: /\.s?css/,
  use: [
    { loader: require.resolve('style-loader') },
    { loader: require.resolve('css-loader'),
      options: {
      url: false,
      importLoaders: 1,
      sourceMap: true
    }},
  ],
  exclude: /node_modules/,
};

/**
 * Image 画像用のローダー設定
*/
const imageRules = {
  test: /\.(jpg|png|gif|svg|eot)$/,
  loader: require.resolve('file-loader'),
  options: {
    name: '[name].[ext]'
  }
}

/**
 * Font用のローダー設定
*/
const fontRules = {
  test: /\.(woff|woff2|ttf)$/,
  loader: require.resolve('file-loader'),
  options: {
    name: '[name].[ext]',
  }
}

/**
 * TypeScript 用のローダー設定。
 */
const tsRules = {
  exclude: /node_modules/,
  test:  /\.tsx?$/,
  use: [
    {
      loader: require.resolve('ts-loader'),
      options: {
        transpileOnly: true,
        compilerOptions: { jsx: 'react', module: 'commonjs' }
      }
    },
    {
      loader: require.resolve('babel-loader'),
      options: {
        configFile: path.resolve(__dirname, `.babelrc`)
      }
    }
  ]
};

/**
 * Webpackの設定をカスタマイズ
 */
const config = {
  mode: 'development',
  target: 'web',
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      tsRules, imageRules, cssRules
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    new webpack.ProvidePlugin({
      React:'react',
    })
  ]
}

module.exports = config;