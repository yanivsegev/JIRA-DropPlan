const path = require('path');

module.exports = {
  entry: {
    app: './src/app.js'
  },
  mode: 'development',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /^(?!.*\.spec\.jsx?$).*\.jsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
        ],
      },
    ],
  },
}
