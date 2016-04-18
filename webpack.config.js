const path = require('path')

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, './dist'),
    publicPath: '/js/',
    filename: 'index.js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: [/node_modules/],
      loader: 'babel',
    }],
  },
}
