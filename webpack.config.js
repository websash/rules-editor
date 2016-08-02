const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './index'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    stats: 'errors-only'
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loaders: ['style', 'css'],
      exclude:  /node_modules\/(?!(react-select)\/).*/
    }, {
      test: /\.less$/,
      loaders: ['style', 'css', 'less'],
      exclude:  /node_modules\/(?!(react-select|elemental)\/).*/
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        cacheDirectory: true,
        presets: ['es2015', 'react', 'stage-1']
      }
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}
